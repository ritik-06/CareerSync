import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { adminAPI, userAPI } from '../../services/api'
import { MapPin, Clock, DollarSign, Calendar, Briefcase } from 'lucide-react'
import LoadingSpinner from '../../components/LoadingSpinner'

const JobListings = () => {
  const [jobs, setJobs] = useState([])
  const [filteredJobs, setFilteredJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filters, setFilters] = useState({
    search: '',
    location: '',
    technology: ''
  })

  useEffect(() => {
    fetchJobs()
  }, [])

  useEffect(() => {
    filterJobs()
  }, [jobs, filters])

  const fetchJobs = async () => {
    try {
      const response = await userAPI.getAllJobs()
      setJobs(response.data)
    } catch (err) {
      setError('Failed to fetch jobs. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const filterJobs = () => {
    let filtered = jobs.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(filters.search.toLowerCase()) ||
                          job.description.toLowerCase().includes(filters.search.toLowerCase())
      
      const matchesLocation = !filters.location || 
                            (job.location && job.location.toLowerCase().includes(filters.location.toLowerCase()))
      
      const matchesTechnology = !filters.technology ||
                              job.technologies.some(tech => 
                                tech.toLowerCase().includes(filters.technology.toLowerCase())
                              )

      return matchesSearch && matchesLocation && matchesTechnology
    })

    setFilteredJobs(filtered)
  }

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    })
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <LoadingSpinner size="large" text="Loading jobs..." />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded max-w-md mx-auto">
          {error}
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Available Jobs</h1>
        
        {/* Filters */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Search Jobs
              </label>
              <input
                type="text"
                name="search"
                value={filters.search}
                onChange={handleFilterChange}
                className="input-field"
                placeholder="Job title or keyword..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={filters.location}
                onChange={handleFilterChange}
                className="input-field"
                placeholder="City or remote..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Technology
              </label>
              <input
                type="text"
                name="technology"
                value={filters.technology}
                onChange={handleFilterChange}
                className="input-field"
                placeholder="React, Python, etc..."
              />
            </div>
          </div>
        </div>
      </div>

      {/* Job Results */}
      <div className="space-y-6">
        {filteredJobs.length === 0 ? (
          <div className="text-center py-12">
            <Briefcase className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
            <p className="text-gray-600">Try adjusting your filters to see more results.</p>
          </div>
        ) : (
          filteredJobs.map((job) => (
            <div key={job._id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{job.title}</h3>
                  <p className="text-gray-600 mb-3 line-clamp-2">{job.description}</p>
                </div>
                <Link
                  to={`/apply/${job._id}`}
                  className="btn-primary whitespace-nowrap"
                >
                  Apply Now
                </Link>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                {job.location && (
                  <div className="flex items-center text-gray-600">
                    <MapPin size={16} className="mr-2" />
                    <span className="text-sm">{job.location}</span>
                  </div>
                )}
                
                {job.salary && (
                  <div className="flex items-center text-gray-600">
                    <DollarSign size={16} className="mr-2" />
                    <span className="text-sm">{job.salary}</span>
                  </div>
                )}
                
                {job.deadline && (
                  <div className="flex items-center text-gray-600">
                    <Calendar size={16} className="mr-2" />
                    <span className="text-sm">Due: {new Date(job.deadline).toLocaleDateString()}</span>
                  </div>
                )}
                
                <div className="flex items-center text-gray-600">
                  <Clock size={16} className="mr-2" />
                  <span className="text-sm">Full-time</span>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Required Skills:</h4>
                <div className="flex flex-wrap gap-2">
                  {job.skills_required.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Technologies:</h4>
                <div className="flex flex-wrap gap-2">
                  {job.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default JobListings