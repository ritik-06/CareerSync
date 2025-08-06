import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { adminAPI } from '../../services/api'
import { Briefcase, Users, Eye, Plus, TrendingUp } from 'lucide-react'
import LoadingSpinner from '../../components/LoadingSpinner'

const AdminDashboard = () => {
  const { admin } = useAuth()
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [stats, setStats] = useState({
    totalJobs: 0,
    totalApplications: 0,
    recentJobs: [],
    applicationsPerJob: {}
  })

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const jobsResponse = await adminAPI.getAllJobs()
      const jobsData = jobsResponse.data || []
      
      const filteredJobs = jobsData.filter(job => job.admin_name === admin?.username)

      let totalApplications = 0
      const applicationsPerJob = {}
      for (const job of filteredJobs) {
        try {
          const appsRes = await adminAPI.getApplications(job._id)
          const appCount = appsRes.data?.length || 0
          totalApplications += appCount
          applicationsPerJob[job._id] = appCount // ✅ Store per job
        } catch {
          applicationsPerJob[job._id] = 0
        }
      }
      setJobs(filteredJobs)
      setStats({
        totalJobs: filteredJobs.length,
        totalApplications, // Would be calculated from applications data
        recentJobs: filteredJobs.slice(0, 5), // Show 5 most recent jobs
        applicationsPerJob
      })
    } catch (err) {
      setError('Failed to load dashboard data')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <LoadingSpinner size="large" text="Loading dashboard..." />
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back, {admin?.username}!</p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="bg-blue-100 rounded-full p-3 mr-4">
              <Briefcase className="text-blue-600" size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Jobs</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalJobs}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="bg-green-100 rounded-full p-3 mr-4">
              <Users className="text-green-600" size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Applications</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalApplications}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="bg-purple-100 rounded-full p-3 mr-4">
              <TrendingUp className="text-purple-600" size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Success Rate</p>
              <p className="text-2xl font-bold text-gray-900">--</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            to="/admin/post-job"
            className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors"
          >
            <Plus className="text-gray-400 mr-2" size={20} />
            <span className="text-gray-600 font-medium">Post New Job</span>
          </Link>
          
          <Link
            to="/admin/all-jobs"
            className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors"
          >
            <Briefcase className="text-gray-400 mr-2" size={20} />
            <span className="text-gray-600 font-medium">Manage Jobs</span>
          </Link>
          
          <button
            className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors"
            disabled
          >
            <Users className="text-gray-400 mr-2" size={20} />
            <span className="text-gray-600 font-medium">View Candidates</span>
          </button>
          
          <button
            className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors"
            disabled
          >
            <TrendingUp className="text-gray-400 mr-2" size={20} />
            <span className="text-gray-600 font-medium">Analytics</span>
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Jobs */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Recent Jobs</h2>
            <Link to="/admin/post-job" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
              Post New Job
            </Link>
          </div>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {stats.recentJobs.length === 0 ? (
            <div className="text-center py-8">
              <Briefcase className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs posted yet</h3>
              <p className="text-gray-600 mb-4">Start by posting your first job opening.</p>
              <Link to="/admin/post-job" className="btn-primary">
                Post Job
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {stats.recentJobs.map((job) => (
                <div key={job._id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900">{job.title}</h3>
                    <Link
                      to={`/admin/applications/${job._id}`}
                      className="text-primary-600 hover:text-primary-700 text-sm flex items-center"
                    >
                      <Eye size={14} className="mr-1" />
                      View Applications
                    </Link>
                  </div>
                  <p className="text-gray-600 text-sm mb-2 line-clamp-2">{job.description}</p>
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>{job.location || 'Remote'}</span>
                    <span>{stats.applicationsPerJob[job._id] || 0} applications</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
          
          <div className="space-y-4">
            <div className="text-center py-8">
              <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No recent activity</h3>
              <p className="text-gray-600">Application activity will appear here.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Help Section */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Getting Started</h3>
        <p className="text-blue-800 mb-4">
          Welcome to your admin dashboard! Here's what you can do:
        </p>
        <ul className="text-blue-800 space-y-1">
          <li>• Post job openings to attract candidates</li>
          <li>• Review applications with AI-powered skill analysis</li>
          <li>• Send emails to shortlisted candidates</li>
          <li>• Track application statistics and success rates</li>
        </ul>
      </div>
    </div>
  )
}

export default AdminDashboard