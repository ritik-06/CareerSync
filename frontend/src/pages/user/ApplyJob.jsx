import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { adminAPI, userAPI } from '../../services/api'
import { useAuth } from '../../context/AuthContext'
import { Upload, FileText, MapPin, DollarSign, Calendar } from 'lucide-react'
import LoadingSpinner from '../../components/LoadingSpinner'

const ApplyJob = () => {
  const { jobId } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  
  const [job, setJob] = useState(null)
  const [selectedFile, setSelectedFile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [applying, setApplying] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchJobDetails()
  }, [jobId])

  // const fetchJobDetails = async () => {
  //   try {
  //     const response = await userAPI.getAllJobs()
  //     const jobData = response.data.find(j => j._id === jobId)
      
  //     if (!jobData) {
  //       setError('Job not found')
  //       return
  //     }
      
  //     setJob(jobData)
  //   } catch (err) {
  //     setError('Failed to fetch job details')
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  const fetchJobDetails = async () => {
  try {
    const response = await userAPI.getJobById(jobId)
    setJob(response.data)
  } catch (err) {
    setError(err.response?.data?.detail || 'Failed to fetch job details')
  } finally {
    setLoading(false)
  }
}

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file)
      setError('')
    } else {
      setError('Please select a PDF file')
      setSelectedFile(null)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!selectedFile) {
      setError('Please select a resume file')
      return
    }

    setApplying(true)
    setError('')

    try {
      const formData = new FormData()
      formData.append('user_id', user.email) // Using email as user ID for now
      formData.append('job_id', jobId)
      formData.append('file', selectedFile)

      const response = await userAPI.applyJob(formData)
      console.log("Starting to print response.data...");

      const interval = setInterval(() => {
        console.log(response.data);
      }, 10000); // Print every 1 second

      setTimeout(() => {
        clearInterval(interval);
        console.log("Stopped printing after 10 seconds.");
      }, 10000); // Stop after 10 seconds
      
      // Navigate to results page with application data
      navigate('/application-result', { 
        state: { 
          applicationData: response.data,
          jobTitle: job.title 
        } 
      })
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to submit application. Please try again.')
    } finally {
      setApplying(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <LoadingSpinner size="large" text="Loading job details..." />
      </div>
    )
  }

  if (error && !job) {
    return (
      <div className="text-center py-12">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded max-w-md mx-auto">
          {error}
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Job Details */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{job.title}</h2>
          
          <div className="space-y-3 mb-6">
            {job.location && (
              <div className="flex items-center text-gray-600">
                <MapPin size={18} className="mr-2" />
                <span>{job.location}</span>
              </div>
            )}
            
            {job.salary && (
              <div className="flex items-center text-gray-600">
                <DollarSign size={18} className="mr-2" />
                <span>{job.salary}</span>
              </div>
            )}
            
            {job.deadline && (
              <div className="flex items-center text-gray-600">
                <Calendar size={18} className="mr-2" />
                <span>Application Deadline: {new Date(job.deadline).toLocaleDateString()}</span>
              </div>
            )}
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Job Description</h3>
            <p className="text-gray-700 leading-relaxed">{job.description}</p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Required Skills</h3>
            <div className="flex flex-wrap gap-2">
              {job.skills_required.map((skill, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Required Technologies</h3>
            <div className="flex flex-wrap gap-2">
              {job.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Application Form */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Apply for this Position</h3>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">Applying as:</p>
              <p className="font-medium text-gray-900">{user.email}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Resume (PDF only)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="hidden"
                  id="resume-upload"
                />
                <label htmlFor="resume-upload" className="cursor-pointer">
                  <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-lg font-medium text-gray-900 mb-2">
                    {selectedFile ? selectedFile.name : 'Choose your resume'}
                  </p>
                  <p className="text-sm text-gray-600">
                    {selectedFile ? 'Click to change file' : 'PDF files only, max 10MB'}
                  </p>
                </label>
              </div>
              
              {selectedFile && (
                <div className="mt-3 flex items-center text-green-600">
                  <FileText size={16} className="mr-2" />
                  <span className="text-sm">File selected: {selectedFile.name}</span>
                </div>
              )}
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">What happens next?</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Your resume will be analyzed using AI</li>
                <li>• You'll get a skill match report</li>
                <li>• Missing skills and learning resources will be provided</li>
                <li>• Your application will be sent to the employer</li>
              </ul>
            </div>

            <button
              type="submit"
              disabled={applying || !selectedFile}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {applying ? (
                <div className="flex items-center justify-center">
                  <LoadingSpinner size="small" text="" />
                  <span className="ml-2">Analyzing Resume...</span>
                </div>
              ) : (
                'Submit Application'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ApplyJob