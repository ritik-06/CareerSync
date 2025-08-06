// import React, { useState, useEffect } from 'react'
// import { useParams, Link } from 'react-router-dom'
// import { adminAPI } from '../../services/api'
// import { ArrowLeft, User, Mail, FileText, CheckCircle, XCircle, Send } from 'lucide-react'
// import LoadingSpinner from '../../components/LoadingSpinner'

// const ViewApplications = () => {
//   const { jobId } = useParams()
//   const [job, setJob] = useState(null)
//   const [applications, setApplications] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState('')
//   const [sendingEmail, setSendingEmail] = useState(null)

//   useEffect(() => {
//     fetchApplications()
//   }, [jobId])

//   const fetchApplications = async () => {
//     try {
//       // First get job details
//       const jobsResponse = await adminAPI.getAllJobs()
//       const jobData = jobsResponse.data.find(j => j._id === jobId)
//       setJob(jobData)

//       // Then get applications for this job
//       try {
//         const applicationsResponse = await adminAPI.getApplications(jobId)
//         setApplications(applicationsResponse.data || [])
//       } catch (appError) {
//         // If no applications found, it's not an error
//         setApplications([])
//       }
//     } catch (err) {
//       setError('Failed to load applications')
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleSendEmail = async (applicationId, userEmail) => {
//     setSendingEmail(applicationId)
    
//     // Simulate email sending (replace with actual API call)
//     setTimeout(() => {
//       alert(`Email sent to ${userEmail} for next round selection!`)
//       setSendingEmail(null)
//     }, 1500)
//   }

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-64">
//         <LoadingSpinner size="large" text="Loading applications..." />
//       </div>
//     )
//   }

//   if (error || !job) {
//     return (
//       <div className="text-center py-12">
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded max-w-md mx-auto">
//           {error || 'Job not found'}
//         </div>
//         <Link to="/admin/dashboard" className="mt-4 inline-block btn-primary">
//           Back to Dashboard
//         </Link>
//       </div>
//     )
//   }

//   return (
//     <div className="max-w-6xl mx-auto">
//       {/* Header */}
//       <div className="mb-8">
//         <Link 
//           to="/admin/dashboard" 
//           className="inline-flex items-center text-primary-600 hover:text-primary-700 transition-colors mb-4"
//         >
//           <ArrowLeft size={18} className="mr-2" />
//           Back to Dashboard
//         </Link>
        
//         <h1 className="text-3xl font-bold text-gray-900 mb-2">Applications for {job.title}</h1>
//         <p className="text-gray-600">{applications.length} applications received</p>
//       </div>

//       {/* Job Summary */}
//       <div className="bg-white rounded-lg shadow-md p-6 mb-8">
//         <h2 className="text-xl font-semibold text-gray-900 mb-4">Job Details</h2>
//         <div className="grid md:grid-cols-2 gap-6">
//           <div>
//             <p className="text-gray-600 mb-2"><strong>Location:</strong> {job.location || 'Not specified'}</p>
//             <p className="text-gray-600 mb-2"><strong>Salary:</strong> {job.salary || 'Not specified'}</p>
//             <p className="text-gray-600"><strong>Deadline:</strong> {job.deadline ? new Date(job.deadline).toLocaleDateString() : 'Not specified'}</p>
//           </div>
//           <div>
//             <p className="text-gray-600 mb-2"><strong>Required Skills:</strong></p>
//             <div className="flex flex-wrap gap-1 mb-3">
//               {job.skills_required.map((skill, index) => (
//                 <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
//                   {skill}
//                 </span>
//               ))}
//             </div>
//             <p className="text-gray-600 mb-2"><strong>Technologies:</strong></p>
//             <div className="flex flex-wrap gap-1">
//               {job.technologies.map((tech, index) => (
//                 <span key={index} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
//                   {tech}
//                 </span>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Applications */}
//       {applications.length === 0 ? (
//         <div className="bg-white rounded-lg shadow-md p-12 text-center">
//           <User className="mx-auto h-12 w-12 text-gray-400 mb-4" />
//           <h3 className="text-lg font-medium text-gray-900 mb-2">No Applications Yet</h3>
//           <p className="text-gray-600">
//             No candidates have applied for this position yet. Share the job posting to attract more applicants.
//           </p>
//         </div>
//       ) : (
//         <div className="space-y-6">
//           {applications.map((application, index) => (
//             <div key={application.id || index} className="bg-white rounded-lg shadow-md p-6">
//               <div className="flex justify-between items-start mb-4">
//                 <div className="flex items-center">
//                   <div className="bg-gray-100 rounded-full w-12 h-12 flex items-center justify-center mr-4">
//                     <User className="text-gray-600" size={24} />
//                   </div>
//                   <div>
//                     <h3 className="text-lg font-semibold text-gray-900">
//                       {application.user_name || application.user_id}
//                     </h3>
//                     <p className="text-gray-600 flex items-center">
//                       <Mail size={14} className="mr-1" />
//                       {application.user_email || application.user_id}
//                     </p>
//                   </div>
//                 </div>
                
//                 <button
//                   onClick={() => handleSendEmail(application.id, application.user_email || application.user_id)}
//                   disabled={sendingEmail === application.id}
//                   className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   {sendingEmail === application.id ? (
//                     <div className="flex items-center">
//                       <LoadingSpinner size="small" text="" />
//                       <span className="ml-2">Sending...</span>
//                     </div>
//                   ) : (
//                     <div className="flex items-center">
//                       <Send size={16} className="mr-2" />
//                       Send Email
//                     </div>
//                   )}
//                 </button>
//               </div>

//               <div className="grid lg:grid-cols-2 gap-6">
//                 {/* Skills Analysis */}
//                 <div>
//                   <h4 className="font-semibold text-gray-900 mb-3">Skills Analysis</h4>
                  
//                   {/* Matched Skills */}
//                   {application.matched_skills && application.matched_skills.length > 0 && (
//                     <div className="mb-4">
//                       <div className="flex items-center mb-2">
//                         <CheckCircle className="text-green-600 mr-2" size={16} />
//                         <span className="text-sm font-medium text-gray-700">Matched Skills</span>
//                       </div>
//                       <div className="flex flex-wrap gap-1">
//                         {application.matched_skills.map((skill, idx) => (
//                           <span key={idx} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
//                             {skill}
//                           </span>
//                         ))}
//                       </div>
//                     </div>
//                   )}

//                   {/* Missing Skills */}
//                   {application.missing_skills && application.missing_skills.length > 0 && (
//                     <div className="mb-4">
//                       <div className="flex items-center mb-2">
//                         <XCircle className="text-red-600 mr-2" size={16} />
//                         <span className="text-sm font-medium text-gray-700">Missing Skills</span>
//                       </div>
//                       <div className="flex flex-wrap gap-1">
//                         {application.missing_skills.map((skill, idx) => (
//                           <span key={idx} className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
//                             {skill}
//                           </span>
//                         ))}
//                       </div>
//                     </div>
//                   )}
//                 </div>

//                 {/* Learning Plan */}
//                 <div>
//                   <h4 className="font-semibold text-gray-900 mb-3">AI Recommendations</h4>
//                   {application.learning_plan && application.learning_plan.length > 0 ? (
//                     <div className="space-y-2">
//                       {application.learning_plan.slice(0, 3).map((item, idx) => (
//                         <div key={idx} className="flex items-start">
//                           <div className="bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium mr-2 mt-0.5">
//                             {idx + 1}
//                           </div>
//                           <p className="text-sm text-gray-700">{item}</p>
//                         </div>
//                       ))}
//                     </div>
//                   ) : (
//                     <p className="text-gray-600 text-sm">No specific recommendations available.</p>
//                   )}
//                 </div>
//               </div>

//               {/* Resume Preview */}
//               {application.resume_text && (
//                 <div className="mt-6 pt-6 border-t border-gray-200">
//                   <div className="flex items-center mb-3">
//                     <FileText className="text-gray-600 mr-2" size={16} />
//                     <h4 className="font-semibold text-gray-900">Resume Preview</h4>
//                   </div>
//                   <div className="bg-gray-50 rounded-lg p-4 max-h-40 overflow-y-auto">
//                     <p className="text-sm text-gray-700 whitespace-pre-wrap">
//                       {application.resume_text.substring(0, 500)}
//                       {application.resume_text.length > 500 && '...'}
//                     </p>
//                   </div>
//                 </div>
//               )}

//               {/* Application Date */}
//               <div className="mt-4 pt-4 border-t border-gray-200">
//                 <p className="text-xs text-gray-500">
//                   Applied on {application.applied_date ? new Date(application.applied_date).toLocaleDateString() : 'Recently'}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   )
// }

// export default ViewApplications
















import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { adminAPI } from '../../services/api'
import { ArrowLeft, User, Mail, CheckCircle, XCircle, Send } from 'lucide-react'
import LoadingSpinner from '../../components/LoadingSpinner'

const ViewApplications = () => {
  const { jobId } = useParams()
  const [job, setJob] = useState(null)
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [sendingEmail, setSendingEmail] = useState(null)

  useEffect(() => {
    fetchApplications()
  }, [jobId])

  const fetchApplications = async () => {
    try {
      const jobsResponse = await adminAPI.getAllJobs()
      const jobData = jobsResponse.data.find(j => j._id === jobId)
      setJob(jobData)

      try {
        const applicationsResponse = await adminAPI.getApplications(jobId)
        setApplications(applicationsResponse.data || [])
      } catch {
        setApplications([])
      }
    } catch {
      setError('Failed to load applications')
    } finally {
      setLoading(false)
    }
  }

  const handleSendEmail = async (applicationId, userEmail) => {
    setSendingEmail(applicationId)
    setTimeout(() => {
      alert(`Email sent to ${userEmail} for next round selection!`)
      setSendingEmail(null)
    }, 1500)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <LoadingSpinner size="large" text="Loading applications..." />
      </div>
    )
  }

  if (error || !job) {
    return (
      <div className="text-center py-12">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded max-w-md mx-auto">
          {error || 'Job not found'}
        </div>
        <Link to="/admin/dashboard" className="mt-4 inline-block btn-primary">
          Back to Dashboard
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <Link 
          to="/admin/dashboard" 
          className="inline-flex items-center text-primary-600 hover:text-primary-700 transition-colors mb-4"
        >
          <ArrowLeft size={18} className="mr-2" />
          Back to Dashboard
        </Link>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Applications for {job.title}</h1>
        <p className="text-gray-600">{applications.length} applications received</p>
      </div>

      {/* Job Summary */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Job Details</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <p className="text-gray-600 mb-2"><strong>Location:</strong> {job.location || 'Not specified'}</p>
            <p className="text-gray-600 mb-2"><strong>Salary:</strong> {job.salary || 'Not specified'}</p>
            <p className="text-gray-600"><strong>Deadline:</strong> {job.deadline ? new Date(job.deadline).toLocaleDateString() : 'Not specified'}</p>
          </div>
          <div>
            <p className="text-gray-600 mb-2"><strong>Required Skills:</strong></p>
            <div className="flex flex-wrap gap-1 mb-3">
              {job.skills_required.map((skill, index) => (
                <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                  {skill}
                </span>
              ))}
            </div>
            <p className="text-gray-600 mb-2"><strong>Technologies:</strong></p>
            <div className="flex flex-wrap gap-1">
              {job.technologies.map((tech, index) => (
                <span key={index} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Applications */}
      {applications.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <User className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Applications Yet</h3>
          <p className="text-gray-600">
            No candidates have applied for this position yet.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {applications.map((application, index) => (
            <div key={application.id || index} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center">
                  <div className="bg-gray-100 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                    <User className="text-gray-600" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {application.user_name || application.user_id}
                    </h3>
                    <p className="text-gray-600 flex items-center">
                      <Mail size={14} className="mr-1" />
                      {application.user_email || application.user_id}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handleSendEmail(application.id, application.user_email || application.user_id)}
                  disabled={sendingEmail === application.id}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {sendingEmail === application.id ? (
                    <div className="flex items-center">
                      <LoadingSpinner size="small" text="" />
                      <span className="ml-2">Sending...</span>
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <Send size={16} className="mr-2" />
                      Send Email
                    </div>
                  )}
                </button>
              </div>

              {/* Skills Analysis */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Matched Skills */}
                {application.matched_skills && application.matched_skills.length > 0 && (
                  <div>
                    <div className="flex items-center mb-2">
                      <CheckCircle className="text-green-600 mr-2" size={16} />
                      <span className="text-sm font-medium text-gray-700">Matched Skills</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {application.matched_skills.map((skill, idx) => (
                        <span key={idx} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Missing Skills */}
                {application.missing_skills && application.missing_skills.length > 0 && (
                  <div>
                    <div className="flex items-center mb-2">
                      <XCircle className="text-red-600 mr-2" size={16} />
                      <span className="text-sm font-medium text-gray-700">Missing Skills</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {application.missing_skills.map((skill, idx) => (
                        <span key={idx} className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Application Date */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500">
                  Applied on {application.applied_date ? new Date(application.applied_date).toLocaleDateString() : 'Recently'}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ViewApplications
