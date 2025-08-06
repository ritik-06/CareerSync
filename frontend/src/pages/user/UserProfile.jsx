// import React, { useState, useEffect } from 'react'
// import { useAuth } from '../../context/AuthContext'
// import { userAPI } from '../../services/api'
// import { User, Mail, Briefcase, Clock } from 'lucide-react'
// import LoadingSpinner from '../../components/LoadingSpinner'

// const UserProfile = () => {
//   const { user } = useAuth()
//   const [profileData, setProfileData] = useState(null)
//   const [applications, setApplications] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState('')

//   useEffect(() => {
//     fetchProfileData()
//   }, [])

//   const fetchProfileData = async () => {
//     try {
//       // Since we don't have a specific profile endpoint that returns applications,
//       // we'll use the stored user data and mock some application history
//       setProfileData({
//         name: user.name || 'User',
//         email: user.email,
//         joinDate: new Date().toLocaleDateString(),
//         totalApplications: 0
//       })
      
//       // In a real app, this would fetch user's applications from the backend
//       setApplications([])
//     } catch (err) {
//       setError('Failed to load profile data')
//     } finally {
//       setLoading(false)
//     }
//   }

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-64">
//         <LoadingSpinner size="large" text="Loading profile..." />
//       </div>
//     )
//   }

//   return (
//     <div className="max-w-4xl mx-auto">
//       <div className="grid lg:grid-cols-3 gap-8">
//         {/* Profile Info */}
//         <div className="lg:col-span-1">
//           <div className="bg-white rounded-lg shadow-md p-6">
//             <div className="text-center mb-6">
//               <div className="bg-primary-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
//                 <User className="text-primary-600" size={40} />
//               </div>
//               <h2 className="text-xl font-bold text-gray-900">{profileData?.name}</h2>
//               <p className="text-gray-600">{profileData?.email}</p>
//             </div>

//             <div className="space-y-4">
//               <div className="flex items-center text-gray-600">
//                 <Mail size={18} className="mr-3" />
//                 <div>
//                   <p className="text-sm font-medium">Email</p>
//                   <p className="text-sm">{profileData?.email}</p>
//                 </div>
//               </div>

//               <div className="flex items-center text-gray-600">
//                 <Clock size={18} className="mr-3" />
//                 <div>
//                   <p className="text-sm font-medium">Member Since</p>
//                   <p className="text-sm">{profileData?.joinDate}</p>
//                 </div>
//               </div>

//               <div className="flex items-center text-gray-600">
//                 <Briefcase size={18} className="mr-3" />
//                 <div>
//                   <p className="text-sm font-medium">Applications</p>
//                   <p className="text-sm">{applications.length} submitted</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Application History */}
//         <div className="lg:col-span-2">
//           <div className="bg-white rounded-lg shadow-md p-6">
//             <h3 className="text-xl font-bold text-gray-900 mb-6">Application History</h3>
            
//             {error && (
//               <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
//                 {error}
//               </div>
//             )}

//             {applications.length === 0 ? (
//               <div className="text-center py-12">
//                 <Briefcase className="mx-auto h-12 w-12 text-gray-400 mb-4" />
//                 <h4 className="text-lg font-medium text-gray-900 mb-2">No Applications Yet</h4>
//                 <p className="text-gray-600 mb-4">
//                   You haven't applied to any jobs yet. Start exploring opportunities!
//                 </p>
//                 <a href="/jobs" className="btn-primary">
//                   Browse Jobs
//                 </a>
//               </div>
//             ) : (
//               <div className="space-y-4">
//                 {applications.map((application, index) => (
//                   <div key={index} className="border border-gray-200 rounded-lg p-4">
//                     <div className="flex justify-between items-start mb-2">
//                       <h4 className="font-semibold text-gray-900">{application.jobTitle}</h4>
//                       <span className={`px-2 py-1 text-xs rounded-full ${
//                         application.status === 'pending' 
//                           ? 'bg-yellow-100 text-yellow-800'
//                           : application.status === 'selected'
//                           ? 'bg-green-100 text-green-800'
//                           : 'bg-red-100 text-red-800'
//                       }`}>
//                         {application.status}
//                       </span>
//                     </div>
//                     <p className="text-gray-600 text-sm mb-2">{application.company}</p>
//                     <p className="text-gray-500 text-xs">
//                       Applied on {application.appliedDate}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Profile Actions */}
//           <div className="bg-white rounded-lg shadow-md p-6 mt-6">
//             <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h3>
//             <div className="grid md:grid-cols-2 gap-4">
//               <a href="/jobs" className="btn-primary text-center">
//                 Browse Jobs
//               </a>
//               <button className="btn-secondary" disabled>
//                 Update Resume
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default UserProfile






import React, { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { userAPI } from '../../services/api'
import { User, Mail, Briefcase, Clock, Eye, TrendingUp, AlertCircle } from 'lucide-react'
import LoadingSpinner from '../../components/LoadingSpinner'
import { useNavigate } from 'react-router-dom'

const UserProfile = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [profileData, setProfileData] = useState(null)
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchProfileData()
  }, [user])

  const fetchProfileData = async () => {
    try {
      setLoading(true)
      
      // Fetch user applications
      if (user?.email) {
        const response = await userAPI.getUserApplications(user.email)
        setApplications(response.data.applications || [])
        
        setProfileData({
          name: user.name || 'User',
          email: user.email,
          joinDate: new Date().toLocaleDateString(),
          totalApplications: response.data.total_applications || 0
        })
      }
    } catch (err) {
      console.error('Error fetching profile data:', err)
      setError('Failed to load profile data')
      // Fallback data if API fails
      setProfileData({
        name: user?.name || 'User',
        email: user?.email || '',
        joinDate: new Date().toLocaleDateString(),
        totalApplications: 0
      })
    } finally {
      setLoading(false)
    }
  }

  const handleViewAnalysis = (applicationId) => {
    navigate(`/application/${applicationId}`)
  }

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'selected':
      case 'approved':
        return 'bg-green-100 text-green-800'
      case 'rejected':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <LoadingSpinner size="large" text="Loading profile..." />
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Profile Info */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-center mb-6">
              <div className="bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <User className="text-blue-600" size={40} />
              </div>
              <h2 className="text-xl font-bold text-gray-900">{profileData?.name}</h2>
              <p className="text-gray-600">{profileData?.email}</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center text-gray-600">
                <Mail size={18} className="mr-3" />
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-sm">{profileData?.email}</p>
                </div>
              </div>

              <div className="flex items-center text-gray-600">
                <Clock size={18} className="mr-3" />
                <div>
                  <p className="text-sm font-medium">Member Since</p>
                  <p className="text-sm">{profileData?.joinDate}</p>
                </div>
              </div>

              <div className="flex items-center text-gray-600">
                <Briefcase size={18} className="mr-3" />
                <div>
                  <p className="text-sm font-medium">Applications</p>
                  <p className="text-sm">{profileData?.totalApplications || 0} submitted</p>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h4 className="text-sm font-medium text-gray-900 mb-3">Quick Stats</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Total Applications</span>
                  <span className="font-medium">{profileData?.totalApplications || 0}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Pending Review</span>
                  <span className="font-medium">{applications.filter(app => app.status === 'pending').length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Application History */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">Application History</h3>
              <button 
                onClick={fetchProfileData}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Refresh
              </button>
            </div>
            
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 flex items-center">
                <AlertCircle size={18} className="mr-2" />
                {error}
              </div>
            )}

            {applications.length === 0 ? (
              <div className="text-center py-12">
                <Briefcase className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h4 className="text-lg font-medium text-gray-900 mb-2">No Applications Yet</h4>
                <p className="text-gray-600 mb-4">
                  You haven't applied to any jobs yet. Start exploring opportunities!
                </p>
                <button 
                  onClick={() => navigate('/jobs')}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  Browse Jobs
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {applications.map((application) => (
                  <div key={application._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1">{application.job_title}</h4>
                        <p className="text-gray-600 text-sm mb-2">{application.company_name}</p>
                        <p className="text-gray-500 text-xs">
                          Applied on {application.applied_date}
                        </p>
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        <span className={`px-2 py-1 text-xs rounded-full font-medium ${getStatusColor(application.status)}`}>
                          {application.status?.charAt(0).toUpperCase() + application.status?.slice(1) || 'Pending'}
                        </span>
                        <button
                          onClick={() => handleViewAnalysis(application._id)}
                          className="flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
                        >
                          <Eye size={14} className="mr-1" />
                          View Analysis
                        </button>
                      </div>
                    </div>
                    
                    {/* Skills Summary */}
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <div className="flex items-center">
                        <TrendingUp size={12} className="mr-1 text-green-500" />
                        {application.matched_skills_count || 0} matched skills
                      </div>
                      <div className="flex items-center">
                        <AlertCircle size={12} className="mr-1 text-orange-500" />
                        {application.missing_skills_count || 0} skills to learn
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Profile Actions */}
          <div className="bg-white rounded-lg shadow-md p-6 mt-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <button 
                onClick={() => navigate('/jobs')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors text-center"
              >
                Browse Jobs
              </button>
              <button 
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors cursor-not-allowed" 
                disabled
              >
                Update Resume
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile