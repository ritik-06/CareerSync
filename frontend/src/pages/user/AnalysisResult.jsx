// import React, { useState, useEffect } from 'react'
// import { useParams, useNavigate } from 'react-router-dom'
// import { userAPI } from '../../services/api'
// import { 
//   ArrowLeft, 
//   Building, 
//   MapPin, 
//   DollarSign, 
//   Calendar,
//   CheckCircle2, 
//   XCircle, 
//   TrendingUp, 
//   BookOpen, 
//   Youtube, 
//   ExternalLink,
//   Target,
//   Lightbulb,
//   AlertCircle,
//   Play
// } from 'lucide-react'
// import LoadingSpinner from '../../components/LoadingSpinner'

// const ApplicationResult = () => {
//   const { applicationId } = useParams()
//   const navigate = useNavigate()
//   const [analysisData, setAnalysisData] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState('')
//   const [activeTab, setActiveTab] = useState('overview')

//   useEffect(() => {
//     fetchAnalysisData()
//   }, [applicationId])

//   const fetchAnalysisData = async () => {
//     try {
//       setLoading(true)
//       const response = await userAPI.getApplicationAnalysis(applicationId)
//       setAnalysisData(response.data)
//     } catch (err) {
//       console.error('Error fetching analysis data:', err)
//       setError('Failed to load application analysis')
//     } finally {
//       setLoading(false)
//     }
//   }

//   const TabButton = ({ id, label, icon: Icon, active }) => (
//     <button
//       onClick={() => setActiveTab(id)}
//       className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
//         active 
//           ? 'bg-blue-100 text-blue-700 border-blue-200' 
//           : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
//       }`}
//     >
//       <Icon size={16} className="mr-2" />
//       {label}
//     </button>
//   )

//   const SkillBadge = ({ skill, type = 'matched' }) => (
//     <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
//       type === 'matched' 
//         ? 'bg-green-100 text-green-800' 
//         : 'bg-orange-100 text-orange-800'
//     }`}>
//       {type === 'matched' ? (
//         <CheckCircle2 size={14} className="mr-1" />
//       ) : (
//         <AlertCircle size={14} className="mr-1" />
//       )}
//       {skill}
//     </span>
//   )

//   // Enhanced LinkCard component to handle both URL strings and objects
//   const LinkCard = ({ link, type = 'youtube', index }) => {
//     // Handle both string URLs and object structures
//     const url = typeof link === 'string' ? link : (link.url || link.link)
//     const title = typeof link === 'string' 
//       ? `${type === 'youtube' ? 'YouTube Tutorial' : 'Learning Resource'} ${index + 1}`
//       : (link.title || link.snippet || `${type === 'youtube' ? 'YouTube Tutorial' : 'Learning Resource'} ${index + 1}`)
    
//     const description = typeof link === 'object' ? link.description : null
//     const channelName = typeof link === 'object' ? link.channel_name : null

//     return (
//       <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
//         <div className="flex items-start justify-between">
//           <div className="flex-1">
//             <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2">
//               {title}
//             </h4>
//             {description && (
//               <p className="text-gray-600 text-sm mb-3 line-clamp-3">
//                 {description}
//               </p>
//             )}
//             {channelName && (
//               <p className="text-gray-500 text-xs mb-2">
//                 By {channelName}
//               </p>
//             )}
//             {typeof link === 'string' && (
//               <p className="text-gray-500 text-xs mb-2 truncate">
//                 {url}
//               </p>
//             )}
//           </div>
//           <div className="ml-4">
//             {type === 'youtube' ? (
//               <Youtube className="text-red-500" size={20} />
//             ) : (
//               <ExternalLink className="text-blue-500" size={20} />
//             )}
//           </div>
//         </div>
//         <a
//           href={url}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium mt-2"
//         >
//           Open Resource
//           <ExternalLink size={14} className="ml-1" />
//         </a>
//       </div>
//     )
//   }

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-64">
//         <LoadingSpinner size="large" text="Loading analysis..." />
//       </div>
//     )
//   }

//   if (error || !analysisData) {
//     return (
//       <div className="max-w-4xl mx-auto p-6">
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg flex items-center">
//           <AlertCircle size={18} className="mr-2" />
//           {error || 'Analysis data not found'}
//         </div>
//       </div>
//     )
//   }

//   // Handle both data structures
//   const job_details = analysisData.job_details || {}
//   const analysis = analysisData.analysis || analysisData
//   const applied_date = analysisData.applied_date || 'N/A'

//   // Get counts for overview
//   const matchedSkillsCount = analysis.matched_skills?.length || 0
//   const missingSkillsCount = analysis.missing_skills?.length || 0
//   const youtubeLinksCount = analysis.youtube_links?.length || 0
//   const serpapiLinksCount = analysis.serpapi_links?.length || 0
//   const totalResourcesCount = youtubeLinksCount + serpapiLinksCount

//   return (
//     <div className="max-w-6xl mx-auto p-6">
//       {/* Header */}
//       <div className="mb-6">
//         <button
//           onClick={() => navigate('/profile')}
//           className="flex items-center text-blue-600 hover:text-blue-800 font-medium mb-4"
//         >
//           <ArrowLeft size={16} className="mr-1" />
//           Back to Profile
//         </button>
        
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <h1 className="text-2xl font-bold text-gray-900 mb-2">
//             {job_details.title || 'Job Application Analysis'}
//           </h1>
//           <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-4">
//             {job_details.company_name && (
//               <div className="flex items-center">
//                 <Building size={16} className="mr-1" />
//                 {job_details.company_name}
//               </div>
//             )}
//             {job_details.location && (
//               <div className="flex items-center">
//                 <MapPin size={16} className="mr-1" />
//                 {job_details.location}
//               </div>
//             )}
//             {job_details.salary && (
//               <div className="flex items-center">
//                 <DollarSign size={16} className="mr-1" />
//                 {job_details.salary}
//               </div>
//             )}
//             <div className="flex items-center">
//               <Calendar size={16} className="mr-1" />
//               Applied: {applied_date}
//             </div>
//           </div>
//           {job_details.job_type && (
//             <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
//               {job_details.job_type}
//             </span>
//           )}
//         </div>
//       </div>

//       {/* Navigation Tabs */}
//       <div className="bg-white rounded-lg shadow-md mb-6">
//         <div className="flex flex-wrap gap-2 p-4 border-b border-gray-200">
//           <TabButton 
//             id="overview" 
//             label="Overview" 
//             icon={Target} 
//             active={activeTab === 'overview'} 
//           />
//           <TabButton 
//             id="skills" 
//             label="Skills Analysis" 
//             icon={CheckCircle2} 
//             active={activeTab === 'skills'} 
//           />
//           <TabButton 
//             id="learning" 
//             label="Learning Plan" 
//             icon={BookOpen} 
//             active={activeTab === 'learning'} 
//           />
//           <TabButton 
//             id="career" 
//             label="Career Path" 
//             icon={TrendingUp} 
//             active={activeTab === 'career'} 
//           />
//           <TabButton 
//             id="resources" 
//             label="Resources" 
//             icon={Youtube} 
//             active={activeTab === 'resources'} 
//           />
//         </div>

//         <div className="p-6">
//           {/* Overview Tab */}
//           {activeTab === 'overview' && (
//             <div className="space-y-6">
//               <div className="grid md:grid-cols-3 gap-6">
//                 <div className="bg-green-50 p-4 rounded-lg">
//                   <div className="flex items-center mb-2">
//                     <CheckCircle2 className="text-green-600 mr-2" size={20} />
//                     <h3 className="font-semibold text-green-800">Matched Skills</h3>
//                   </div>
//                   <p className="text-2xl font-bold text-green-600">
//                     {matchedSkillsCount}
//                   </p>
//                 </div>
//                 <div className="bg-orange-50 p-4 rounded-lg">
//                   <div className="flex items-center mb-2">
//                     <AlertCircle className="text-orange-600 mr-2" size={20} />
//                     <h3 className="font-semibold text-orange-800">Skills to Learn</h3>
//                   </div>
//                   <p className="text-2xl font-bold text-orange-600">
//                     {missingSkillsCount}
//                   </p>
//                 </div>
//                 <div className="bg-blue-50 p-4 rounded-lg">
//                   <div className="flex items-center mb-2">
//                     <BookOpen className="text-blue-600 mr-2" size={20} />
//                     <h3 className="font-semibold text-blue-800">Learning Resources</h3>
//                   </div>
//                   <p className="text-2xl font-bold text-blue-600">
//                     {totalResourcesCount}
//                   </p>
//                 </div>
//               </div>

//               {job_details.description && (
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-900 mb-3">Job Description</h3>
//                   <div className="bg-gray-50 p-4 rounded-lg">
//                     <p className="text-gray-700 whitespace-pre-line">
//                       {job_details.description}
//                     </p>
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}

//           {/* Skills Analysis Tab */}
//           {activeTab === 'skills' && (
//             <div className="space-y-6">
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
//                   <CheckCircle2 className="text-green-600 mr-2" size={20} />
//                   Matched Skills ({matchedSkillsCount})
//                 </h3>
//                 {analysis.matched_skills?.length > 0 ? (
//                   <div className="flex flex-wrap gap-2">
//                     {analysis.matched_skills.map((skill, index) => (
//                       <SkillBadge key={index} skill={skill} type="matched" />
//                     ))}
//                   </div>
//                 ) : (
//                   <p className="text-gray-500 italic">No matched skills found</p>
//                 )}
//               </div>

//               <div>
//                 <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
//                   <AlertCircle className="text-orange-600 mr-2" size={20} />
//                   Skills to Learn ({missingSkillsCount})
//                 </h3>
//                 {analysis.missing_skills?.length > 0 ? (
//                   <div className="flex flex-wrap gap-2">
//                     {analysis.missing_skills.map((skill, index) => (
//                       <SkillBadge key={index} skill={skill} type="missing" />
//                     ))}
//                   </div>
//                 ) : (
//                   <p className="text-gray-500 italic">No missing skills identified</p>
//                 )}
//               </div>
//             </div>
//           )}

//           {/* Learning Plan Tab */}
//           {activeTab === 'learning' && (
//             <div className="space-y-6">
//               {/* Handle both old and new learning_plan formats */}
//               {analysis.learning_plan?.length > 0 && (
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
//                     <Lightbulb className="text-yellow-600 mr-2" size={20} />
//                     Learning Plan
//                   </h3>
//                   <div className="space-y-3">
//                     {analysis.learning_plan.map((item, index) => {
//                       // Handle both string items and object items
//                       if (typeof item === 'string') {
//                         return (
//                           <div key={index} className="bg-gray-50 p-4 rounded-lg">
//                             <div className="flex items-start">
//                               <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full mr-3 mt-1">
//                                 {index + 1}
//                               </span>
//                               <p className="text-gray-700">{item}</p>
//                             </div>
//                           </div>
//                         )
//                       } else {
//                         // Handle object format with skill and resources
//                         return (
//                           <div key={index} className="bg-gray-50 p-4 rounded-lg">
//                             <div className="flex items-center mb-3">
//                               <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full mr-3">
//                                 {index + 1}
//                               </span>
//                               <h4 className="text-lg font-medium text-gray-800">{item.skill}</h4>
//                             </div>
//                             {item.resources && item.resources.length > 0 && (
//                               <div className="pl-8">
//                                 <ul className="space-y-1">
//                                   {item.resources.map((res, idx) => (
//                                     <li key={idx} className="text-sm text-gray-700">
//                                       <a
//                                         href={res.link}
//                                         target="_blank"
//                                         rel="noopener noreferrer"
//                                         className="text-blue-600 hover:underline"
//                                       >
//                                         • [{res.type}] {res.title}
//                                       </a>
//                                     </li>
//                                   ))}
//                                 </ul>
//                               </div>
//                             )}
//                           </div>
//                         )
//                       }
//                     })}
//                   </div>
//                 </div>
//               )}

//               {analysis.learning_roadmap?.length > 0 && (
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
//                     <BookOpen className="text-blue-600 mr-2" size={20} />
//                     Learning Roadmap
//                   </h3>
//                   <div className="space-y-3">
//                     {analysis.learning_roadmap.map((item, index) => (
//                       <div key={index} className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
//                         <p className="text-gray-700">{item}</p>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {(!analysis.learning_plan?.length && !analysis.learning_roadmap?.length) && (
//                 <div className="text-center py-8">
//                   <BookOpen className="mx-auto h-12 w-12 text-gray-400 mb-4" />
//                   <p className="text-gray-500">No learning plan available</p>
//                 </div>
//               )}
//             </div>
//           )}

//           {/* Career Path Tab */}
//           {activeTab === 'career' && (
//             <div className="space-y-6">
//               {analysis.career_path?.length > 0 ? (
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
//                     <TrendingUp className="text-green-600 mr-2" size={20} />
//                     Career Path Recommendations
//                   </h3>
//                   <div className="space-y-4">
//                     {analysis.career_path.map((step, index) => (
//                       <div key={index} className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg border-l-4 border-green-400">
//                         <div className="flex items-start">
//                           <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full mr-4 mt-1">
//                             Step {index + 1}
//                           </span>
//                           <p className="text-gray-700 flex-1">{step}</p>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               ) : (
//                 <div className="text-center py-8">
//                   <TrendingUp className="mx-auto h-12 w-12 text-gray-400 mb-4" />
//                   <p className="text-gray-500">No career path recommendations available</p>
//                 </div>
//               )}
//             </div>
//           )}

//           {/* Resources Tab */}
//           {activeTab === 'resources' && (
//             <div className="space-y-6">
//               {analysis.youtube_links?.length > 0 && (
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
//                     <Youtube className="text-red-600 mr-2" size={20} />
//                     YouTube Learning Videos ({youtubeLinksCount})
//                   </h3>
//                   <div className="grid md:grid-cols-2 gap-4">
//                     {analysis.youtube_links.map((link, index) => (
//                       <LinkCard key={index} link={link} type="youtube" index={index} />
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {analysis.serpapi_links?.length > 0 && (
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
//                     <ExternalLink className="text-blue-600 mr-2" size={20} />
//                     Additional Learning Resources ({serpapiLinksCount})
//                   </h3>
//                   <div className="grid md:grid-cols-2 gap-4">
//                     {analysis.serpapi_links.map((link, index) => (
//                       <LinkCard key={index} link={link} type="web" index={index} />
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {(!analysis.youtube_links?.length && !analysis.serpapi_links?.length) && (
//                 <div className="text-center py-8">
//                   <ExternalLink className="mx-auto h-12 w-12 text-gray-400 mb-4" />
//                   <p className="text-gray-500">No learning resources available</p>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Action Buttons */}
//       <div className="bg-white rounded-lg shadow-md p-6">
//         <h3 className="text-lg font-semibold text-gray-900 mb-4">Next Steps</h3>
//         <div className="flex flex-wrap gap-4">
//           <button
//             onClick={() => navigate('/jobs')}
//             className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
//           >
//             Browse More Jobs
//           </button>
//           <button
//             onClick={() => navigate('/profile')}
//             className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-medium transition-colors"
//           >
//             View All Applications
//           </button>
//           <button
//             onClick={() => window.print()}
//             className="bg-green-100 hover:bg-green-200 text-green-700 px-6 py-2 rounded-lg font-medium transition-colors"
//           >
//             Print Analysis
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default ApplicationResult



// import React, { useState, useEffect } from 'react'
// import { useParams, useNavigate } from 'react-router-dom'
// import { userAPI } from '../../services/api'
// import { 
//   ArrowLeft, 
//   Building, 
//   MapPin, 
//   DollarSign, 
//   Calendar,
//   CheckCircle2, 
//   XCircle, 
//   TrendingUp, 
//   BookOpen, 
//   Youtube, 
//   ExternalLink,
//   Target,
//   Lightbulb,
//   AlertCircle,
//   Play,
//   Award,
//   HelpCircle,
//   Users
// } from 'lucide-react'
// import LoadingSpinner from '../../components/LoadingSpinner'

// const ApplicationResult = () => {
//   const { applicationId } = useParams()
//   const navigate = useNavigate()
//   const [analysisData, setAnalysisData] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState('')
//   const [activeTab, setActiveTab] = useState('overview')
  
//   // Progress tracking state
//   const [completedItems, setCompletedItems] = useState({
//     roadmap: {},
//     youtube: {},
//     resources: {}
//   })

//   useEffect(() => {
//     fetchAnalysisData()
//   }, [applicationId])

//   const fetchAnalysisData = async () => {
//     try {
//       setLoading(true)
//       const response = await userAPI.getApplicationAnalysis(applicationId)
//       setAnalysisData(response.data)
//     } catch (err) {
//       console.error('Error fetching analysis data:', err)
//       setError('Failed to load application analysis')
//     } finally {
//       setLoading(false)
//     }
//   }

//   // Calculate progress percentage
//   const calculateProgress = () => {
//     if (!analysisData) return 0
    
//     const analysis = analysisData.analysis || analysisData
//     const roadmapCount = analysis.learning_roadmap?.length || 0
//     const youtubeCount = analysis.youtube_links?.length || 0
//     const resourcesCount = analysis.serpapi_links?.length || 0
    
//     const totalItems = roadmapCount + youtubeCount + resourcesCount
//     if (totalItems === 0) return 0
    
//     const completedCount = Object.values(completedItems.roadmap).filter(Boolean).length +
//                           Object.values(completedItems.youtube).filter(Boolean).length +
//                           Object.values(completedItems.resources).filter(Boolean).length
    
//     return Math.round((completedCount / totalItems) * 100)
//   }

//   // Handle checkbox changes
//   const handleCheckboxChange = (section, index, checked) => {
//     setCompletedItems(prev => ({
//       ...prev,
//       [section]: {
//         ...prev[section],
//         [index]: checked
//       }
//     }))
//   }

//   const TabButton = ({ id, label, icon: Icon, active }) => (
//     <button
//       onClick={() => setActiveTab(id)}
//       className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
//         active 
//           ? 'bg-blue-100 text-blue-700 border-blue-200' 
//           : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
//       }`}
//     >
//       <Icon size={16} className="mr-2" />
//       {label}
//     </button>
//   )

//   const SkillBadge = ({ skill, type = 'matched' }) => (
//     <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
//       type === 'matched' 
//         ? 'bg-green-100 text-green-800' 
//         : 'bg-orange-100 text-orange-800'
//     }`}>
//       {type === 'matched' ? (
//         <CheckCircle2 size={14} className="mr-1" />
//       ) : (
//         <AlertCircle size={14} className="mr-1" />
//       )}
//       {skill}
//     </span>
//   )

//   // Enhanced LinkCard component to handle both URL strings and objects
//   const LinkCard = ({ link, type = 'youtube', index, section, isCompleted, onToggle }) => {
//     // Handle both string URLs and object structures
//     const url = typeof link === 'string' ? link : (link.url || link.link)
//     const title = typeof link === 'string' 
//       ? `${type === 'youtube' ? 'YouTube Tutorial' : 'Learning Resource'} ${index + 1}`
//       : (link.title || link.snippet || `${type === 'youtube' ? 'YouTube Tutorial' : 'Learning Resource'} ${index + 1}`)
    
//     const description = typeof link === 'object' ? link.description : null
//     const channelName = typeof link === 'object' ? link.channel_name : null

//     return (
//       <div className={`border rounded-lg p-4 hover:shadow-md transition-all ${
//         isCompleted ? 'border-green-300 bg-green-50' : 'border-gray-200'
//       }`}>
//         <div className="flex items-start justify-between">
//           <div className="flex items-start space-x-3 flex-1">
//             <input
//               type="checkbox"
//               checked={isCompleted}
//               onChange={(e) => onToggle(e.target.checked)}
//               className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//             />
//             <div className="flex-1">
//               <h4 className={`font-semibold mb-2 line-clamp-2 ${
//                 isCompleted ? 'text-green-800 line-through' : 'text-gray-900'
//               }`}>
//                 {title}
//               </h4>
//               {description && (
//                 <p className="text-gray-600 text-sm mb-3 line-clamp-3">
//                   {description}
//                 </p>
//               )}
//               {channelName && (
//                 <p className="text-gray-500 text-xs mb-2">
//                   By {channelName}
//                 </p>
//               )}
//               {typeof link === 'string' && (
//                 <p className="text-gray-500 text-xs mb-2 truncate">
//                   {url}
//                 </p>
//               )}
//             </div>
//           </div>
//           <div className="ml-4">
//             {type === 'youtube' ? (
//               <Youtube className="text-red-500" size={20} />
//             ) : (
//               <ExternalLink className="text-blue-500" size={20} />
//             )}
//           </div>
//         </div>
//         <a
//           href={url}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium mt-2 ml-7"
//         >
//           Open Resource
//           <ExternalLink size={14} className="ml-1" />
//         </a>
//       </div>
//     )
//   }

//   // Progress bar component
//   const ProgressBar = ({ percentage }) => (
//     <div className="mb-6">
//       <div className="flex items-center justify-between mb-2">
//         <h3 className="text-lg font-semibold text-gray-900">Learning Progress</h3>
//         <span className="text-sm font-medium text-gray-600">{percentage}% Complete</span>
//       </div>
//       <div className="w-full bg-gray-200 rounded-full h-3">
//         <div 
//           className={`h-3 rounded-full transition-all duration-300 ${
//             percentage === 100 ? 'bg-green-500' : 'bg-blue-500'
//           }`}
//           style={{ width: `${percentage}%` }}
//         ></div>
//       </div>
//       {percentage === 100 && (
//         <p className="text-green-600 text-sm mt-2 font-medium">
//           🎉 Congratulations! You've completed all learning materials. Questions are now available below.
//         </p>
//       )}
//     </div>
//   )

//   // Question component
//   const QuestionSection = ({ title, questions, icon: Icon, bgColor, textColor }) => (
//     <div className="mt-8">
//       <h3 className={`text-lg font-semibold mb-4 flex items-center ${textColor}`}>
//         <Icon className="mr-2" size={20} />
//         {title} ({questions?.length || 0} questions)
//       </h3>
//       {questions?.length > 0 ? (
//         <div className="space-y-3">
//           {questions.map((question, index) => (
//             <div key={index} className={`${bgColor} p-4 rounded-lg border-l-4 border-current`}>
//               <div className="flex items-start">
//                 <span className="bg-white bg-opacity-50 text-current text-sm font-medium px-3 py-1 rounded-full mr-4 mt-1">
//                   Q{index + 1}
//                 </span>
//                 <p className="text-gray-800 flex-1">{question}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p className="text-gray-500 italic">No questions available</p>
//       )}
//     </div>
//   )

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-64">
//         <LoadingSpinner size="large" text="Loading analysis..." />
//       </div>
//     )
//   }

//   if (error || !analysisData) {
//     return (
//       <div className="max-w-4xl mx-auto p-6">
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg flex items-center">
//           <AlertCircle size={18} className="mr-2" />
//           {error || 'Analysis data not found'}
//         </div>
//       </div>
//     )
//   }

//   // Handle both data structures
//   const job_details = analysisData.job_details || {}
//   const analysis = analysisData.analysis || analysisData
//   const applied_date = analysisData.applied_date || 'N/A'
//   const ats_score = analysisData.ats_score || analysis.ats_score

//   // Get counts for overview
//   const matchedSkillsCount = analysis.matched_skills?.length || 0
//   const missingSkillsCount = analysis.missing_skills?.length || 0
//   const youtubeLinksCount = analysis.youtube_links?.length || 0
//   const serpapiLinksCount = analysis.serpapi_links?.length || 0
//   const totalResourcesCount = youtubeLinksCount + serpapiLinksCount

//   const progressPercentage = calculateProgress()
//   const isLearningComplete = progressPercentage === 100

//   return (
//     <div className="max-w-6xl mx-auto p-6">
//       {/* Header */}
//       <div className="mb-6">
//         <button
//           onClick={() => navigate('/profile')}
//           className="flex items-center text-blue-600 hover:text-blue-800 font-medium mb-4"
//         >
//           <ArrowLeft size={16} className="mr-1" />
//           Back to Profile
//         </button>
        
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <h1 className="text-2xl font-bold text-gray-900 mb-2">
//             {job_details.title || 'Job Application Analysis'}
//           </h1>
//           <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-4">
//             {job_details.company_name && (
//               <div className="flex items-center">
//                 <Building size={16} className="mr-1" />
//                 {job_details.company_name}
//               </div>
//             )}
//             {job_details.location && (
//               <div className="flex items-center">
//                 <MapPin size={16} className="mr-1" />
//                 {job_details.location}
//               </div>
//             )}
//             {job_details.salary && (
//               <div className="flex items-center">
//                 <DollarSign size={16} className="mr-1" />
//                 {job_details.salary}
//               </div>
//             )}
//             <div className="flex items-center">
//               <Calendar size={16} className="mr-1" />
//               Applied: {applied_date}
//             </div>
//             {ats_score && (
//               <div className="flex items-center">
//                 <Award size={16} className="mr-1" />
//                 ATS Score: {ats_score}%
//               </div>
//             )}
//           </div>
//           {job_details.job_type && (
//             <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
//               {job_details.job_type}
//             </span>
//           )}
//         </div>
//       </div>

//       {/* Navigation Tabs */}
//       <div className="bg-white rounded-lg shadow-md mb-6">
//         <div className="flex flex-wrap gap-2 p-4 border-b border-gray-200">
//           <TabButton 
//             id="overview" 
//             label="Overview" 
//             icon={Target} 
//             active={activeTab === 'overview'} 
//           />
//           <TabButton 
//             id="skills" 
//             label="Skills Analysis" 
//             icon={CheckCircle2} 
//             active={activeTab === 'skills'} 
//           />
//           <TabButton 
//             id="learning" 
//             label="Learning Plan" 
//             icon={BookOpen} 
//             active={activeTab === 'learning'} 
//           />
//           <TabButton 
//             id="career" 
//             label="Career Path" 
//             icon={TrendingUp} 
//             active={activeTab === 'career'} 
//           />
//           <TabButton 
//             id="resources" 
//             label="Resources" 
//             icon={Youtube} 
//             active={activeTab === 'resources'} 
//           />
//         </div>

//         <div className="p-6">
//           {/* Overview Tab */}
//           {activeTab === 'overview' && (
//             <div className="space-y-6">
//               <div className="grid md:grid-cols-4 gap-6">
//                 <div className="bg-green-50 p-4 rounded-lg">
//                   <div className="flex items-center mb-2">
//                     <CheckCircle2 className="text-green-600 mr-2" size={20} />
//                     <h3 className="font-semibold text-green-800">Matched Skills</h3>
//                   </div>
//                   <p className="text-2xl font-bold text-green-600">
//                     {matchedSkillsCount}
//                   </p>
//                 </div>
//                 <div className="bg-orange-50 p-4 rounded-lg">
//                   <div className="flex items-center mb-2">
//                     <AlertCircle className="text-orange-600 mr-2" size={20} />
//                     <h3 className="font-semibold text-orange-800">Skills to Learn</h3>
//                   </div>
//                   <p className="text-2xl font-bold text-orange-600">
//                     {missingSkillsCount}
//                   </p>
//                 </div>
//                 <div className="bg-blue-50 p-4 rounded-lg">
//                   <div className="flex items-center mb-2">
//                     <BookOpen className="text-blue-600 mr-2" size={20} />
//                     <h3 className="font-semibold text-blue-800">Learning Resources</h3>
//                   </div>
//                   <p className="text-2xl font-bold text-blue-600">
//                     {totalResourcesCount}
//                   </p>
//                 </div>
//                 {ats_score && (
//                   <div className="bg-purple-50 p-4 rounded-lg">
//                     <div className="flex items-center mb-2">
//                       <Award className="text-purple-600 mr-2" size={20} />
//                       <h3 className="font-semibold text-purple-800">ATS Score</h3>
//                     </div>
//                     <p className="text-2xl font-bold text-purple-600">
//                       {ats_score}%
//                     </p>
//                   </div>
//                 )}
//               </div>

//               {job_details.description && (
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-900 mb-3">Job Description</h3>
//                   <div className="bg-gray-50 p-4 rounded-lg">
//                     <p className="text-gray-700 whitespace-pre-line">
//                       {job_details.description}
//                     </p>
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}

//           {/* Skills Analysis Tab */}
//           {activeTab === 'skills' && (
//             <div className="space-y-6">
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
//                   <CheckCircle2 className="text-green-600 mr-2" size={20} />
//                   Matched Skills ({matchedSkillsCount})
//                 </h3>
//                 {analysis.matched_skills?.length > 0 ? (
//                   <div className="flex flex-wrap gap-2">
//                     {analysis.matched_skills.map((skill, index) => (
//                       <SkillBadge key={index} skill={skill} type="matched" />
//                     ))}
//                   </div>
//                 ) : (
//                   <p className="text-gray-500 italic">No matched skills found</p>
//                 )}
//               </div>

//               <div>
//                 <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
//                   <AlertCircle className="text-orange-600 mr-2" size={20} />
//                   Skills to Learn ({missingSkillsCount})
//                 </h3>
//                 {analysis.missing_skills?.length > 0 ? (
//                   <div className="flex flex-wrap gap-2">
//                     {analysis.missing_skills.map((skill, index) => (
//                       <SkillBadge key={index} skill={skill} type="missing" />
//                     ))}
//                   </div>
//                 ) : (
//                   <p className="text-gray-500 italic">No missing skills identified</p>
//                 )}
//               </div>
//             </div>
//           )}

//           {/* Enhanced Learning Plan Tab */}
//           {activeTab === 'learning' && (
//             <div className="space-y-6">
//               {/* Progress Bar */}
//               <ProgressBar percentage={progressPercentage} />

//               {/* Learning Roadmap */}
//               {analysis.learning_roadmap?.length > 0 && (
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
//                     <BookOpen className="text-blue-600 mr-2" size={20} />
//                     Learning Roadmap ({analysis.learning_roadmap.length} steps)
//                   </h3>
//                   <div className="space-y-3">
//                     {analysis.learning_roadmap.map((item, index) => (
//                       <div key={index} className={`p-4 rounded-lg transition-all ${
//                         completedItems.roadmap[index] 
//                           ? 'bg-green-50 border-l-4 border-green-400' 
//                           : 'bg-blue-50 border-l-4 border-blue-400'
//                       }`}>
//                         <div className="flex items-start space-x-3">
//                           <input
//                             type="checkbox"
//                             checked={completedItems.roadmap[index] || false}
//                             onChange={(e) => handleCheckboxChange('roadmap', index, e.target.checked)}
//                             className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                           />
//                           <p className={`text-gray-700 flex-1 ${
//                             completedItems.roadmap[index] ? 'line-through text-green-700' : ''
//                           }`}>
//                             {item}
//                           </p>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* YouTube Tutorials */}
//               {analysis.youtube_links?.length > 0 && (
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
//                     <Youtube className="text-red-600 mr-2" size={20} />
//                     YouTube Tutorials ({youtubeLinksCount})
//                   </h3>
//                   <div className="grid md:grid-cols-2 gap-4">
//                     {analysis.youtube_links.map((link, index) => (
//                       <LinkCard 
//                         key={index} 
//                         link={link} 
//                         type="youtube" 
//                         index={index}
//                         section="youtube"
//                         isCompleted={completedItems.youtube[index] || false}
//                         onToggle={(checked) => handleCheckboxChange('youtube', index, checked)}
//                       />
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* Online Courses / Web Links */}
//               {analysis.serpapi_links?.length > 0 && (
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
//                     <ExternalLink className="text-blue-600 mr-2" size={20} />
//                     Online Courses / Web Links ({serpapiLinksCount})
//                   </h3>
//                   <div className="grid md:grid-cols-2 gap-4">
//                     {analysis.serpapi_links.map((link, index) => (
//                       <LinkCard 
//                         key={index} 
//                         link={link} 
//                         type="web" 
//                         index={index}
//                         section="resources"
//                         isCompleted={completedItems.resources[index] || false}
//                         onToggle={(checked) => handleCheckboxChange('resources', index, checked)}
//                       />
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* Conditional Question Sections - Only show when 100% complete */}
//               {isLearningComplete && (
//                 <>
//                   {/* Aptitude Questions */}
//                   {analysis.aptitude_questions?.length > 0 && (
//                     <QuestionSection
//                       title="Aptitude Questions"
//                       questions={analysis.aptitude_questions}
//                       icon={HelpCircle}
//                       bgColor="bg-purple-50"
//                       textColor="text-purple-800"
//                     />
//                   )}

//                   {/* Interview Questions */}
//                   {analysis.interview_questions?.length > 0 && (
//                     <QuestionSection
//                       title="Interview Questions"
//                       questions={analysis.interview_questions}
//                       icon={Users}
//                       bgColor="bg-indigo-50"
//                       textColor="text-indigo-800"
//                     />
//                   )}
//                 </>
//               )}

//               {/* Handle old learning_plan format for backward compatibility */}
//               {analysis.learning_plan?.length > 0 && !analysis.learning_roadmap?.length && (
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
//                     <Lightbulb className="text-yellow-600 mr-2" size={20} />
//                     Learning Plan
//                   </h3>
//                   <div className="space-y-3">
//                     {analysis.learning_plan.map((item, index) => {
//                       if (typeof item === 'string') {
//                         return (
//                           <div key={index} className="bg-gray-50 p-4 rounded-lg">
//                             <div className="flex items-start">
//                               <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full mr-3 mt-1">
//                                 {index + 1}
//                               </span>
//                               <p className="text-gray-700">{item}</p>
//                             </div>
//                           </div>
//                         )
//                       } else {
//                         return (
//                           <div key={index} className="bg-gray-50 p-4 rounded-lg">
//                             <div className="flex items-center mb-3">
//                               <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full mr-3">
//                                 {index + 1}
//                               </span>
//                               <h4 className="text-lg font-medium text-gray-800">{item.skill}</h4>
//                             </div>
//                             {item.resources && item.resources.length > 0 && (
//                               <div className="pl-8">
//                                 <ul className="space-y-1">
//                                   {item.resources.map((res, idx) => (
//                                     <li key={idx} className="text-sm text-gray-700">
//                                       <a
//                                         href={res.link}
//                                         target="_blank"
//                                         rel="noopener noreferrer"
//                                         className="text-blue-600 hover:underline"
//                                       >
//                                         • [{res.type}] {res.title}
//                                       </a>
//                                     </li>
//                                   ))}
//                                 </ul>
//                               </div>
//                             )}
//                           </div>
//                         )
//                       }
//                     })}
//                   </div>
//                 </div>
//               )}

//               {(!analysis.learning_plan?.length && !analysis.learning_roadmap?.length && !analysis.youtube_links?.length && !analysis.serpapi_links?.length) && (
//                 <div className="text-center py-8">
//                   <BookOpen className="mx-auto h-12 w-12 text-gray-400 mb-4" />
//                   <p className="text-gray-500">No learning materials available</p>
//                 </div>
//               )}
//             </div>
//           )}

//           {/* Career Path Tab */}
//           {activeTab === 'career' && (
//             <div className="space-y-6">
//               {analysis.career_path?.length > 0 ? (
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
//                     <TrendingUp className="text-green-600 mr-2" size={20} />
//                     Career Path Recommendations
//                   </h3>
//                   <div className="space-y-4">
//                     {analysis.career_path.map((step, index) => (
//                       <div key={index} className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg border-l-4 border-green-400">
//                         <div className="flex items-start">
//                           <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full mr-4 mt-1">
//                             Step {index + 1}
//                           </span>
//                           <p className="text-gray-700 flex-1">{step}</p>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               ) : (
//                 <div className="text-center py-8">
//                   <TrendingUp className="mx-auto h-12 w-12 text-gray-400 mb-4" />
//                   <p className="text-gray-500">No career path recommendations available</p>
//                 </div>
//               )}
//             </div>
//           )}

//           {/* Resources Tab */}
//           {/* Learning Roadmap */}
//               {analysis.learning_roadmap?.length > 0 && (
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
//                     <BookOpen className="text-blue-600 mr-2" size={20} />
//                     Learning Roadmap ({analysis.learning_roadmap.length} steps)
//                   </h3>
//                   <div className="space-y-3">
//                     {analysis.learning_roadmap.map((item, index) => (
//                       <div key={index} className={`p-4 rounded-lg transition-all ${
//                         completedItems.roadmap[index] 
//                           ? 'bg-green-50 border-l-4 border-green-400' 
//                           : 'bg-blue-50 border-l-4 border-blue-400'
//                       }`}>
//                         <div className="flex items-start space-x-3">
//                           <input
//                             type="checkbox"
//                             checked={completedItems.roadmap[index] || false}
//                             onChange={(e) => handleCheckboxChange('roadmap', index, e.target.checked)}
//                             className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                           />
//                           <p className={`text-gray-700 flex-1 ${
//                             completedItems.roadmap[index] ? 'line-through text-green-700' : ''
//                           }`}>
//                             {item}
//                           </p>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}
//         </div>
//       </div>

//       {/* Action Buttons */}
//       <div className="bg-white rounded-lg shadow-md p-6">
//         <h3 className="text-lg font-semibold text-gray-900 mb-4">Next Steps</h3>
//         <div className="flex flex-wrap gap-4">
//           <button
//             onClick={() => navigate('/jobs')}
//             className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
//           >
//             Browse More Jobs
//           </button>
//           <button
//             onClick={() => navigate('/profile')}
//             className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-medium transition-colors"
//           >
//             View All Applications
//           </button>
//           <button
//             onClick={() => window.print()}
//             className="bg-green-100 hover:bg-green-200 text-green-700 px-6 py-2 rounded-lg font-medium transition-colors"
//           >
//             Print Analysis
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default ApplicationResult







// import React, { useState, useEffect } from 'react'
// import { useParams, useNavigate } from 'react-router-dom'
// import { userAPI } from '../../services/api'
// import { 
//   ArrowLeft, 
//   Building, 
//   MapPin, 
//   DollarSign, 
//   Calendar,
//   CheckCircle2, 
//   XCircle, 
//   TrendingUp, 
//   BookOpen, 
//   Youtube, 
//   ExternalLink,
//   Target,
//   Lightbulb,
//   AlertCircle,
//   Play,
//   Award,
//   HelpCircle,
//   Users
// } from 'lucide-react'
// import LoadingSpinner from '../../components/LoadingSpinner'

// const ApplicationResult = () => {
//   const { applicationId } = useParams()
//   const navigate = useNavigate()
//   const [analysisData, setAnalysisData] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState('')
//   const [activeTab, setActiveTab] = useState('overview')
  
//   // Progress tracking state
//   const [completedItems, setCompletedItems] = useState({
//     learningPlan: {},
//     youtube: {},
//     resources: {}
//   })

//   useEffect(() => {
//     fetchAnalysisData()
//   }, [applicationId])

//   const fetchAnalysisData = async () => {
//     try {
//       setLoading(true)
//       const response = await userAPI.getApplicationAnalysis(applicationId)
//       setAnalysisData(response.data)
//     } catch (err) {
//       console.error('Error fetching analysis data:', err)
//       setError('Failed to load application analysis')
//     } finally {
//       setLoading(false)
//     }
//   }

//   // Calculate progress percentage
//   const calculateProgress = () => {
//     if (!analysisData) return 0
    
//     const analysis = analysisData.analysis || analysisData
//     const learningPlanCount = analysis.learning_plan?.length || 0
//     const youtubeCount = analysis.youtube_links?.length || 0
//     const resourcesCount = analysis.serpapi_links?.length || 0
    
//     const totalItems = learningPlanCount + youtubeCount + resourcesCount
//     if (totalItems === 0) return 0
    
//     const completedCount = Object.values(completedItems.learningPlan).filter(Boolean).length +
//                           Object.values(completedItems.youtube).filter(Boolean).length +
//                           Object.values(completedItems.resources).filter(Boolean).length
    
//     return Math.round((completedCount / totalItems) * 100)
//   }

//   // Handle checkbox changes
//   const handleCheckboxChange = (section, index, checked) => {
//     setCompletedItems(prev => ({
//       ...prev,
//       [section]: {
//         ...prev[section],
//         [index]: checked
//       }
//     }))
//   }

//   const TabButton = ({ id, label, icon: Icon, active }) => (
//     <button
//       onClick={() => setActiveTab(id)}
//       className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
//         active 
//           ? 'bg-blue-100 text-blue-700 border-blue-200' 
//           : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
//       }`}
//     >
//       <Icon size={16} className="mr-2" />
//       {label}
//     </button>
//   )

//   const SkillBadge = ({ skill, type = 'matched' }) => (
//     <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
//       type === 'matched' 
//         ? 'bg-green-100 text-green-800' 
//         : 'bg-orange-100 text-orange-800'
//     }`}>
//       {type === 'matched' ? (
//         <CheckCircle2 size={14} className="mr-1" />
//       ) : (
//         <AlertCircle size={14} className="mr-1" />
//       )}
//       {skill}
//     </span>
//   )

//   // Enhanced LinkCard component to handle both URL strings and objects
//   const LinkCard = ({ link, type = 'youtube', index, section, isCompleted, onToggle }) => {
//     // Handle both string URLs and object structures
//     const url = typeof link === 'string' ? link : (link.url || link.link)
//     const title = typeof link === 'string' 
//       ? `${type === 'youtube' ? 'YouTube Tutorial' : 'Learning Resource'} ${index + 1}`
//       : (link.title || link.snippet || `${type === 'youtube' ? 'YouTube Tutorial' : 'Learning Resource'} ${index + 1}`)
    
//     const description = typeof link === 'object' ? link.description : null
//     const channelName = typeof link === 'object' ? link.channel_name : null

//     return (
//       <div className={`border rounded-lg p-4 hover:shadow-md transition-all ${
//         isCompleted ? 'border-green-300 bg-green-50' : 'border-gray-200'
//       }`}>
//         <div className="flex items-start justify-between">
//           <div className="flex items-start space-x-3 flex-1">
//             <input
//               type="checkbox"
//               checked={isCompleted}
//               onChange={(e) => onToggle(e.target.checked)}
//               className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//             />
//             <div className="flex-1">
//               <h4 className={`font-semibold mb-2 line-clamp-2 ${
//                 isCompleted ? 'text-green-800 line-through' : 'text-gray-900'
//               }`}>
//                 {title}
//               </h4>
//               {description && (
//                 <p className="text-gray-600 text-sm mb-3 line-clamp-3">
//                   {description}
//                 </p>
//               )}
//               {channelName && (
//                 <p className="text-gray-500 text-xs mb-2">
//                   By {channelName}
//                 </p>
//               )}
//               {typeof link === 'string' && (
//                 <p className="text-gray-500 text-xs mb-2 truncate">
//                   {url}
//                 </p>
//               )}
//             </div>
//           </div>
//           <div className="ml-4">
//             {type === 'youtube' ? (
//               <Youtube className="text-red-500" size={20} />
//             ) : (
//               <ExternalLink className="text-blue-500" size={20} />
//             )}
//           </div>
//         </div>
//         <a
//           href={url}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium mt-2 ml-7"
//         >
//           Open Resource
//           <ExternalLink size={14} className="ml-1" />
//         </a>
//       </div>
//     )
//   }

//   // Progress bar component
//   const ProgressBar = ({ percentage }) => (
//     <div className="mb-6">
//       <div className="flex items-center justify-between mb-2">
//         <h3 className="text-lg font-semibold text-gray-900">Learning Progress</h3>
//         <span className="text-sm font-medium text-gray-600">{percentage}% Complete</span>
//       </div>
//       <div className="w-full bg-gray-200 rounded-full h-3">
//         <div 
//           className={`h-3 rounded-full transition-all duration-300 ${
//             percentage === 100 ? 'bg-green-500' : 'bg-blue-500'
//           }`}
//           style={{ width: `${percentage}%` }}
//         ></div>
//       </div>
//       {percentage === 100 && (
//         <p className="text-green-600 text-sm mt-2 font-medium">
//           🎉 Congratulations! You've completed all learning materials. Questions are now available below.
//         </p>
//       )}
//     </div>
//   )

//   // Question component
//   const QuestionSection = ({ title, questions, icon: Icon, bgColor, textColor }) => (
//     <div className="mt-8">
//       <h3 className={`text-lg font-semibold mb-4 flex items-center ${textColor}`}>
//         <Icon className="mr-2" size={20} />
//         {title} ({questions?.length || 0} questions)
//       </h3>
//       {questions?.length > 0 ? (
//         <div className="space-y-3">
//           {questions.map((question, index) => (
//             <div key={index} className={`${bgColor} p-4 rounded-lg border-l-4 border-current`}>
//               <div className="flex items-start">
//                 <span className="bg-white bg-opacity-50 text-current text-sm font-medium px-3 py-1 rounded-full mr-4 mt-1">
//                   Q{index + 1}
//                 </span>
//                 <p className="text-gray-800 flex-1">{question}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p className="text-gray-500 italic">No questions available</p>
//       )}
//     </div>
//   )

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-64">
//         <LoadingSpinner size="large" text="Loading analysis..." />
//       </div>
//     )
//   }

//   if (error || !analysisData) {
//     return (
//       <div className="max-w-4xl mx-auto p-6">
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg flex items-center">
//           <AlertCircle size={18} className="mr-2" />
//           {error || 'Analysis data not found'}
//         </div>
//       </div>
//     )
//   }

//   // Handle both data structures
//   const job_details = analysisData.job_details || {}
//   const analysis = analysisData.analysis || analysisData
//   const applied_date = analysisData.applied_date || 'N/A'
//   const ats_score = analysisData.ats_score || analysis.ats_score

//   // Get counts for overview
//   const matchedSkillsCount = analysis.matched_skills?.length || 0
//   const missingSkillsCount = analysis.missing_skills?.length || 0
//   const youtubeLinksCount = analysis.youtube_links?.length || 0
//   const serpapiLinksCount = analysis.serpapi_links?.length || 0
//   const totalResourcesCount = youtubeLinksCount + serpapiLinksCount

//   const progressPercentage = calculateProgress()
//   const isLearningComplete = progressPercentage === 100

//   return (
//     <div className="max-w-6xl mx-auto p-6">
//       {/* Header */}
//       <div className="mb-6">
//         <button
//           onClick={() => navigate('/profile')}
//           className="flex items-center text-blue-600 hover:text-blue-800 font-medium mb-4"
//         >
//           <ArrowLeft size={16} className="mr-1" />
//           Back to Profile
//         </button>
        
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <h1 className="text-2xl font-bold text-gray-900 mb-2">
//             {job_details.title || 'Job Application Analysis'}
//           </h1>
//           <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-4">
//             {job_details.company_name && (
//               <div className="flex items-center">
//                 <Building size={16} className="mr-1" />
//                 {job_details.company_name}
//               </div>
//             )}
//             {job_details.location && (
//               <div className="flex items-center">
//                 <MapPin size={16} className="mr-1" />
//                 {job_details.location}
//               </div>
//             )}
//             {job_details.salary && (
//               <div className="flex items-center">
//                 <DollarSign size={16} className="mr-1" />
//                 {job_details.salary}
//               </div>
//             )}
//             <div className="flex items-center">
//               <Calendar size={16} className="mr-1" />
//               Applied: {applied_date}
//             </div>
//             {ats_score && (
//               <div className="flex items-center">
//                 <Award size={16} className="mr-1" />
//                 ATS Score: {ats_score}%
//               </div>
//             )}
//           </div>
//           {job_details.job_type && (
//             <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
//               {job_details.job_type}
//             </span>
//           )}
//         </div>
//       </div>

//       {/* Navigation Tabs */}
//       <div className="bg-white rounded-lg shadow-md mb-6">
//         <div className="flex flex-wrap gap-2 p-4 border-b border-gray-200">
//           <TabButton 
//             id="overview" 
//             label="Overview" 
//             icon={Target} 
//             active={activeTab === 'overview'} 
//           />
//           <TabButton 
//             id="skills" 
//             label="Skills Analysis" 
//             icon={CheckCircle2} 
//             active={activeTab === 'skills'} 
//           />
//           <TabButton 
//             id="learning" 
//             label="Learning Plan" 
//             icon={BookOpen} 
//             active={activeTab === 'learning'} 
//           />
//           <TabButton 
//             id="career" 
//             label="Career Path" 
//             icon={TrendingUp} 
//             active={activeTab === 'career'} 
//           />
//           <TabButton 
//             id="resources" 
//             label="Learning Roadmap"
//             icon={BookOpen} 
//             active={activeTab === 'resources'} 
//           />
//         </div>

//         <div className="p-6">
//           {/* Overview Tab */}
//           {activeTab === 'overview' && (
//             <div className="space-y-6">
//               <div className="grid md:grid-cols-4 gap-6">
//                 <div className="bg-green-50 p-4 rounded-lg">
//                   <div className="flex items-center mb-2">
//                     <CheckCircle2 className="text-green-600 mr-2" size={20} />
//                     <h3 className="font-semibold text-green-800">Matched Skills</h3>
//                   </div>
//                   <p className="text-2xl font-bold text-green-600">
//                     {matchedSkillsCount}
//                   </p>
//                 </div>
//                 <div className="bg-orange-50 p-4 rounded-lg">
//                   <div className="flex items-center mb-2">
//                     <AlertCircle className="text-orange-600 mr-2" size={20} />
//                     <h3 className="font-semibold text-orange-800">Skills to Learn</h3>
//                   </div>
//                   <p className="text-2xl font-bold text-orange-600">
//                     {missingSkillsCount}
//                   </p>
//                 </div>
//                 <div className="bg-blue-50 p-4 rounded-lg">
//                   <div className="flex items-center mb-2">
//                     <BookOpen className="text-blue-600 mr-2" size={20} />
//                     <h3 className="font-semibold text-blue-800">Learning Resources</h3>
//                   </div>
//                   <p className="text-2xl font-bold text-blue-600">
//                     {totalResourcesCount}
//                   </p>
//                 </div>
//                 {ats_score && (
//                   <div className="bg-purple-50 p-4 rounded-lg">
//                     <div className="flex items-center mb-2">
//                       <Award className="text-purple-600 mr-2" size={20} />
//                       <h3 className="font-semibold text-purple-800">ATS Score</h3>
//                     </div>
//                     <p className="text-2xl font-bold text-purple-600">
//                       {ats_score}%
//                     </p>
//                   </div>
//                 )}
//               </div>

//               {job_details.description && (
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-900 mb-3">Job Description</h3>
//                   <div className="bg-gray-50 p-4 rounded-lg">
//                     <p className="text-gray-700 whitespace-pre-line">
//                       {job_details.description}
//                     </p>
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}

//           {/* Skills Analysis Tab */}
//           {activeTab === 'skills' && (
//             <div className="space-y-6">
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
//                   <CheckCircle2 className="text-green-600 mr-2" size={20} />
//                   Matched Skills ({matchedSkillsCount})
//                 </h3>
//                 {analysis.matched_skills?.length > 0 ? (
//                   <div className="flex flex-wrap gap-2">
//                     {analysis.matched_skills.map((skill, index) => (
//                       <SkillBadge key={index} skill={skill} type="matched" />
//                     ))}
//                   </div>
//                 ) : (
//                   <p className="text-gray-500 italic">No matched skills found</p>
//                 )}
//               </div>

//               <div>
//                 <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
//                   <AlertCircle className="text-orange-600 mr-2" size={20} />
//                   Skills to Learn ({missingSkillsCount})
//                 </h3>
//                 {analysis.missing_skills?.length > 0 ? (
//                   <div className="flex flex-wrap gap-2">
//                     {analysis.missing_skills.map((skill, index) => (
//                       <SkillBadge key={index} skill={skill} type="missing" />
//                     ))}
//                   </div>
//                 ) : (
//                   <p className="text-gray-500 italic">No missing skills identified</p>
//                 )}
//               </div>
//             </div>
//           )}

//           {/* Enhanced Learning Plan Tab */}
//           {activeTab === 'learning' && (
//             <div className="space-y-6">
//               {/* Progress Bar */}
//               <ProgressBar percentage={progressPercentage} />

//               {/* Learning Plan */}
//               {analysis.learning_plan?.length > 0 && (
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
//                     <Lightbulb className="text-yellow-600 mr-2" size={20} />
//                     Learning Plan ({analysis.learning_plan.length} items)
//                   </h3>
//                   <div className="space-y-3">
//                     {analysis.learning_plan.map((item, index) => {
//                       // Handle both string items and object items
//                       if (typeof item === 'string') {
//                         return (
//                           <div key={index} className={`p-4 rounded-lg transition-all ${
//                             completedItems.learningPlan[index] 
//                               ? 'bg-green-50 border-l-4 border-green-400' 
//                               : 'bg-yellow-50 border-l-4 border-yellow-400'
//                           }`}>
//                             <div className="flex items-start space-x-3">
//                               <input
//                                 type="checkbox"
//                                 checked={completedItems.learningPlan[index] || false}
//                                 onChange={(e) => handleCheckboxChange('learningPlan', index, e.target.checked)}
//                                 className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                               />
//                               <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded-full mr-3 mt-1">
//                                 {index + 1}
//                               </span>
//                               <p className={`text-gray-700 flex-1 ${
//                                 completedItems.learningPlan[index] ? 'line-through text-green-700' : ''
//                               }`}>
//                                 {item}
//                               </p>
//                             </div>
//                           </div>
//                         )
//                       } else {
//                         // Handle object format with skill and resources
//                         return (
//                           <div key={index} className={`p-4 rounded-lg transition-all ${
//                             completedItems.learningPlan[index] 
//                               ? 'bg-green-50 border-l-4 border-green-400' 
//                               : 'bg-yellow-50 border-l-4 border-yellow-400'
//                           }`}>
//                             <div className="flex items-start space-x-3">
//                               <input
//                                 type="checkbox"
//                                 checked={completedItems.learningPlan[index] || false}
//                                 onChange={(e) => handleCheckboxChange('learningPlan', index, e.target.checked)}
//                                 className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                               />
//                               <div className="flex-1">
//                                 <div className="flex items-center mb-3">
//                                   <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded-full mr-3">
//                                     {index + 1}
//                                   </span>
//                                   <h4 className={`text-lg font-medium text-gray-800 ${
//                                     completedItems.learningPlan[index] ? 'line-through text-green-700' : ''
//                                   }`}>
//                                     {item.skill}
//                                   </h4>
//                                 </div>
//                                 {item.resources && item.resources.length > 0 && (
//                                   <div className="pl-8">
//                                     <ul className="space-y-1">
//                                       {item.resources.map((res, idx) => (
//                                         <li key={idx} className="text-sm text-gray-700">
//                                           <a
//                                             href={res.link}
//                                             target="_blank"
//                                             rel="noopener noreferrer"
//                                             className="text-blue-600 hover:underline"
//                                           >
//                                             • [{res.type}] {res.title}
//                                           </a>
//                                         </li>
//                                       ))}
//                                     </ul>
//                                   </div>
//                                 )}
//                               </div>
//                             </div>
//                           </div>
//                         )
//                       }
//                     })}
//                   </div>
//                 </div>
//               )}

//               {/* YouTube Tutorials */}
//               {analysis.youtube_links?.length > 0 && (
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
//                     <Youtube className="text-red-600 mr-2" size={20} />
//                     YouTube Tutorials ({youtubeLinksCount})
//                   </h3>
//                   <div className="grid md:grid-cols-2 gap-4">
//                     {analysis.youtube_links.map((link, index) => (
//                       <LinkCard 
//                         key={index} 
//                         link={link} 
//                         type="youtube" 
//                         index={index}
//                         section="youtube"
//                         isCompleted={completedItems.youtube[index] || false}
//                         onToggle={(checked) => handleCheckboxChange('youtube', index, checked)}
//                       />
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* Online Courses / Web Links */}
//               {analysis.serpapi_links?.length > 0 && (
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
//                     <ExternalLink className="text-blue-600 mr-2" size={20} />
//                     Online Courses / Web Links ({serpapiLinksCount})
//                   </h3>
//                   <div className="grid md:grid-cols-2 gap-4">
//                     {analysis.serpapi_links.map((link, index) => (
//                       <LinkCard 
//                         key={index} 
//                         link={link} 
//                         type="web" 
//                         index={index}
//                         section="resources"
//                         isCompleted={completedItems.resources[index] || false}
//                         onToggle={(checked) => handleCheckboxChange('resources', index, checked)}
//                       />
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* Conditional Question Sections - Only show when 100% complete */}
//               {isLearningComplete && (
//                 <>
//                   {/* Aptitude Questions */}
//                   {analysis.aptitude_questions?.length > 0 && (
//                     <QuestionSection
//                       title="Aptitude Questions"
//                       questions={analysis.aptitude_questions}
//                       icon={HelpCircle}
//                       bgColor="bg-purple-50"
//                       textColor="text-purple-800"
//                     />
//                   )}

//                   {/* Interview Questions */}
//                   {analysis.interview_questions?.length > 0 && (
//                     <QuestionSection
//                       title="Interview Questions"
//                       questions={analysis.interview_questions}
//                       icon={Users}
//                       bgColor="bg-indigo-50"
//                       textColor="text-indigo-800"
//                     />
//                   )}
//                 </>
//               )}

//               {(!analysis.learning_plan?.length && !analysis.youtube_links?.length && !analysis.serpapi_links?.length) && (
//                 <div className="text-center py-8">
//                   <BookOpen className="mx-auto h-12 w-12 text-gray-400 mb-4" />
//                   <p className="text-gray-500">No learning materials available</p>
//                 </div>
//               )}
//             </div>
//           )}

//           {/* Career Path Tab */}
//           {activeTab === 'career' && (
//             <div className="space-y-6">
//               {analysis.career_path?.length > 0 ? (
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
//                     <TrendingUp className="text-green-600 mr-2" size={20} />
//                     Career Path Recommendations
//                   </h3>
//                   <div className="space-y-4">
//                     {analysis.career_path.map((step, index) => (
//                       <div key={index} className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg border-l-4 border-green-400">
//                         <div className="flex items-start">
//                           <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full mr-4 mt-1">
//                             Step {index + 1}
//                           </span>
//                           <p className="text-gray-700 flex-1">{step}</p>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               ) : (
//                 <div className="text-center py-8">
//                   <TrendingUp className="mx-auto h-12 w-12 text-gray-400 mb-4" />
//                   <p className="text-gray-500">No career path recommendations available</p>
//                 </div>
//               )}
//             </div>
//           )}

//           {/* Resources Tab */}
//           {activeTab === 'resources' && (
//             <div className="space-y-6">
//               {/* Learning Roadmap */}
//               {analysis.learning_roadmap?.length > 0 && (
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
//                     <BookOpen className="text-blue-600 mr-2" size={20} />
//                     Learning Roadmap ({analysis.learning_roadmap.length} steps)
//                   </h3>
//                   <div className="space-y-3">
//                     {analysis.learning_roadmap.map((item, index) => (
//                       <div key={index} className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
//                         <div className="flex items-start">
//                           <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full mr-4 mt-1">
//                             Step {index + 1}
//                           </span>
//                           <p className="text-gray-700 flex-1">{item}</p>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {analysis.youtube_links?.length > 0 && (
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
//                     <Youtube className="text-red-600 mr-2" size={20} />
//                     YouTube Learning Videos ({youtubeLinksCount})
//                   </h3>
//                   <div className="grid md:grid-cols-2 gap-4">
//                     {analysis.youtube_links.map((link, index) => (
//                       <LinkCard key={index} link={link} type="youtube" index={index} />
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {analysis.serpapi_links?.length > 0 && (
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
//                     <ExternalLink className="text-blue-600 mr-2" size={20} />
//                     Additional Learning Resources ({serpapiLinksCount})
//                   </h3>
//                   <div className="grid md:grid-cols-2 gap-4">
//                     {analysis.serpapi_links.map((link, index) => (
//                       <LinkCard key={index} link={link} type="web" index={index} />
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {(!analysis.learning_roadmap?.length && !analysis.youtube_links?.length && !analysis.serpapi_links?.length) && (
//                 <div className="text-center py-8">
//                   <ExternalLink className="mx-auto h-12 w-12 text-gray-400 mb-4" />
//                   <p className="text-gray-500">No learning resources available</p>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Action Buttons */}
//       <div className="bg-white rounded-lg shadow-md p-6">
//         <h3 className="text-lg font-semibold text-gray-900 mb-4">Next Steps</h3>
//         <div className="flex flex-wrap gap-4">
//           <button
//             onClick={() => navigate('/jobs')}
//             className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
//           >
//             Browse More Jobs
//           </button>
//           <button
//             onClick={() => navigate('/profile')}
//             className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-medium transition-colors"
//           >
//             View All Applications
//           </button>
//           <button
//             onClick={() => window.print()}
//             className="bg-green-100 hover:bg-green-200 text-green-700 px-6 py-2 rounded-lg font-medium transition-colors"
//           >
//             Print Analysis
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default ApplicationResult












import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { userAPI } from '../../services/api'
import { 
  ArrowLeft, 
  Building, 
  MapPin, 
  DollarSign, 
  Calendar,
  CheckCircle2, 
  XCircle, 
  TrendingUp, 
  BookOpen, 
  Youtube, 
  ExternalLink,
  Target,
  Lightbulb,
  AlertCircle,
  Play,
  Award,
  HelpCircle,
  Users
} from 'lucide-react'
import LoadingSpinner from '../../components/LoadingSpinner'

const ApplicationResult = () => {
  const { applicationId } = useParams()
  const navigate = useNavigate()
  const [analysisData, setAnalysisData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState('overview')
  
  // Progress tracking state
  const [completedItems, setCompletedItems] = useState({
    learningPlan: {},
    youtube: {},
    resources: {}
  })

  useEffect(() => {
    fetchAnalysisData()
  }, [applicationId])

  const fetchAnalysisData = async () => {
    try {
      setLoading(true)
      const response = await userAPI.getApplicationAnalysis(applicationId)
      setAnalysisData(response.data)
    } catch (err) {
      console.error('Error fetching analysis data:', err)
      setError('Failed to load application analysis')
    } finally {
      setLoading(false)
    }
  }

  // Calculate progress percentage
  const calculateProgress = () => {
    if (!analysisData) return 0
    
    const analysis = analysisData.analysis || analysisData
    const learningPlanCount = analysis.learning_plan?.length || 0
    const youtubeCount = analysis.youtube_links?.length || 0
    const resourcesCount = analysis.serpapi_links?.length || 0
    
    const totalItems = learningPlanCount + youtubeCount + resourcesCount
    if (totalItems === 0) return 0
    
    const completedCount = Object.values(completedItems.learningPlan).filter(Boolean).length +
                          Object.values(completedItems.youtube).filter(Boolean).length +
                          Object.values(completedItems.resources).filter(Boolean).length
    
    return Math.round((completedCount / totalItems) * 100)
  }

  // Handle checkbox changes
  const handleCheckboxChange = (section, index, checked) => {
    setCompletedItems(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [index]: checked
      }
    }))
  }

  const TabButton = ({ id, label, icon: Icon, active }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
        active 
          ? 'bg-blue-100 text-blue-700 border-blue-200' 
          : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
      }`}
    >
      <Icon size={16} className="mr-2" />
      {label}
    </button>
  )

  const SkillBadge = ({ skill, type = 'matched' }) => (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
      type === 'matched' 
        ? 'bg-green-100 text-green-800' 
        : 'bg-orange-100 text-orange-800'
    }`}>
      {type === 'matched' ? (
        <CheckCircle2 size={14} className="mr-1" />
      ) : (
        <AlertCircle size={14} className="mr-1" />
      )}
      {skill}
    </span>
  )

  // Enhanced LinkCard component to handle both URL strings and objects
  const LinkCard = ({ link, type = 'youtube', index, section, isCompleted, onToggle }) => {
    // Handle both string URLs and object structures
    const url = typeof link === 'string' ? link : (link.url || link.link)
    const title = typeof link === 'string' 
      ? `${type === 'youtube' ? 'YouTube Tutorial' : 'Learning Resource'} ${index + 1}`
      : (link.title || link.snippet || `${type === 'youtube' ? 'YouTube Tutorial' : 'Learning Resource'} ${index + 1}`)
    
    const description = typeof link === 'object' ? link.description : null
    const channelName = typeof link === 'object' ? link.channel_name : null

    return (
      <div className={`border rounded-lg p-4 hover:shadow-md transition-all ${
        isCompleted ? 'border-green-300 bg-green-50' : 'border-gray-200'
      }`}>
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3 flex-1">
            <input
              type="checkbox"
              checked={isCompleted}
              onChange={(e) => onToggle(e.target.checked)}
              className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <div className="flex-1">
              <h4 className={`font-semibold mb-2 line-clamp-2 ${
                isCompleted ? 'text-green-800 line-through' : 'text-gray-900'
              }`}>
                {title}
              </h4>
              {description && (
                <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                  {description}
                </p>
              )}
              {channelName && (
                <p className="text-gray-500 text-xs mb-2">
                  By {channelName}
                </p>
              )}
              {typeof link === 'string' && (
                <p className="text-gray-500 text-xs mb-2 truncate">
                  {url}
                </p>
              )}
            </div>
          </div>
          <div className="ml-4">
            {type === 'youtube' ? (
              <Youtube className="text-red-500" size={20} />
            ) : (
              <ExternalLink className="text-blue-500" size={20} />
            )}
          </div>
        </div>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium mt-2 ml-7"
        >
          Open Resource
          <ExternalLink size={14} className="ml-1" />
        </a>
      </div>
    )
  }

  // Progress bar component
  const ProgressBar = ({ percentage }) => (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold text-gray-900">Learning Progress</h3>
        <span className="text-sm font-medium text-gray-600">{percentage}% Complete</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div 
          className={`h-3 rounded-full transition-all duration-300 ${
            percentage === 100 ? 'bg-green-500' : 'bg-blue-500'
          }`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      {percentage === 100 && (
        <p className="text-green-600 text-sm mt-2 font-medium">
          🎉 Congratulations! You've completed all learning materials. Questions are now available below.
        </p>
      )}
    </div>
  )

  // Enhanced Question component with options for aptitude questions
  const QuestionSection = ({ title, questions, icon: Icon, bgColor, textColor, showOptions = false }) => (
    <div className="mt-8">
      <h3 className={`text-lg font-semibold mb-4 flex items-center ${textColor}`}>
        <Icon className="mr-2" size={20} />
        {title} ({questions?.length || 0} questions)
      </h3>
      {questions?.length > 0 ? (
        <div className="space-y-3">
          {questions.map((item, index) => {
            // Handle both string questions and object questions with options
            const question = typeof item === 'string' ? item : item.question
            const options = typeof item === 'object' ? item.options : null
            const answer = typeof item === 'object' ? item.answer : null
            const type = typeof item === 'object' ? item.type : null

            return (
              <div key={index} className={`${bgColor} p-4 rounded-lg border-l-4 border-current`}>
                <div className="flex items-start">
                  <span className="bg-white bg-opacity-50 text-current text-sm font-medium px-3 py-1 rounded-full mr-4 mt-1">
                    Q{index + 1}
                  </span>
                  <div className="flex-1">
                    <p className="text-gray-800 mb-3">{question}</p>
                    {type && (
                      <span className="inline-block bg-white bg-opacity-30 text-current text-xs px-2 py-1 rounded-full mb-2">
                        {type.replace('_', ' ').toUpperCase()}
                      </span>
                    )}
                    {showOptions && options && (
                      <div className="mt-3">
                        <div className="grid grid-cols-1 gap-2">
                          {options.map((option, optIndex) => (
                            <div key={optIndex} className={`p-2 rounded border ${
                              answer === option 
                                ? 'bg-green-100 border-green-400 text-green-800 font-medium' 
                                : 'bg-white bg-opacity-50 border-gray-300'
                            }`}>
                              <span className="font-medium mr-2">{String.fromCharCode(65 + optIndex)}.</span>
                              {option}
                              {answer === option && (
                                <span className="ml-2 text-green-600">✓ Correct Answer</span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <p className="text-gray-500 italic">No questions available</p>
      )}
    </div>
  )

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <LoadingSpinner size="large" text="Loading analysis..." />
      </div>
    )
  }

  if (error || !analysisData) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg flex items-center">
          <AlertCircle size={18} className="mr-2" />
          {error || 'Analysis data not found'}
        </div>
      </div>
    )
  }

  // Handle both data structures
  const job_details = analysisData.job_details || {}
  const analysis = analysisData.analysis || analysisData
  const applied_date = analysisData.applied_date || 'N/A'
  const ats_score = analysisData.ats_score || analysis.ats_score
  const ats_summary = analysisData.ats_summary || analysis.ats_summary

  // Get counts for overview
  const matchedSkillsCount = analysis.matched_skills?.length || 0
  const missingSkillsCount = analysis.missing_skills?.length || 0
  const youtubeLinksCount = analysis.youtube_links?.length || 0
  const serpapiLinksCount = analysis.serpapi_links?.length || 0
  const totalResourcesCount = youtubeLinksCount + serpapiLinksCount

  const progressPercentage = calculateProgress()
  const isLearningComplete = progressPercentage === 100

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => navigate('/profile')}
          className="flex items-center text-blue-600 hover:text-blue-800 font-medium mb-4"
        >
          <ArrowLeft size={16} className="mr-1" />
          Back to Profile
        </button>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {job_details.title || 'Job Application Analysis'}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-4">
            {job_details.company_name && (
              <div className="flex items-center">
                <Building size={16} className="mr-1" />
                {job_details.company_name}
              </div>
            )}
            {job_details.location && (
              <div className="flex items-center">
                <MapPin size={16} className="mr-1" />
                {job_details.location}
              </div>
            )}
            {job_details.salary && (
              <div className="flex items-center">
                <DollarSign size={16} className="mr-1" />
                {job_details.salary}
              </div>
            )}
            <div className="flex items-center">
              <Calendar size={16} className="mr-1" />
              Applied: {applied_date}
            </div>
            {ats_score && (
              <div className="flex items-center">
                <Award size={16} className="mr-1" />
                ATS Score: {ats_score}%
              </div>
            )}
          </div>
          {job_details.job_type && (
            <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              {job_details.job_type}
            </span>
          )}
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-lg shadow-md mb-6">
        <div className="flex flex-wrap gap-2 p-4 border-b border-gray-200">
          <TabButton 
            id="overview" 
            label="Overview" 
            icon={Target} 
            active={activeTab === 'overview'} 
          />
          <TabButton 
            id="skills" 
            label="Skills Analysis" 
            icon={CheckCircle2} 
            active={activeTab === 'skills'} 
          />
          <TabButton 
            id="learning" 
            label="Learning Plan" 
            icon={BookOpen} 
            active={activeTab === 'learning'} 
          />
          <TabButton 
            id="career" 
            label="Raodmap" 
            icon={TrendingUp} 
            active={activeTab === 'career'} 
          />
          <TabButton 
            id="questions" 
            label="Questions" 
            icon={HelpCircle} 
            active={activeTab === 'questions'} 
          />
        </div>

        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-5 gap-6">
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <CheckCircle2 className="text-green-600 mr-2" size={20} />
                    <h3 className="font-semibold text-green-800">Matched Skills</h3>
                  </div>
                  <p className="text-2xl font-bold text-green-600">
                    {matchedSkillsCount}
                  </p>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <AlertCircle className="text-orange-600 mr-2" size={20} />
                    <h3 className="font-semibold text-orange-800">Skills to Learn</h3>
                  </div>
                  <p className="text-2xl font-bold text-orange-600">
                    {missingSkillsCount}
                  </p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <BookOpen className="text-blue-600 mr-2" size={20} />
                    <h3 className="font-semibold text-blue-800">Learning Resources</h3>
                  </div>
                  <p className="text-2xl font-bold text-blue-600">
                    {totalResourcesCount}
                  </p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Award className="text-purple-600 mr-2" size={20} />
                    <h3 className="font-semibold text-purple-800">ATS Score</h3>
                  </div>
                  <p className={`text-2xl font-bold ${
                    ats_score >= 80 ? 'text-green-600' :
                    ats_score >= 60 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {ats_score || 'N/A'}%
                  </p>
                </div>
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Target className="text-indigo-600 mr-2" size={20} />
                    <h3 className="font-semibold text-indigo-800">Progress</h3>
                  </div>
                  <p className="text-2xl font-bold text-indigo-600">
                    {progressPercentage}%
                  </p>
                </div>
              </div>

              {/* ATS Summary */}
              {ats_summary && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">ATS Analysis Summary</h3>
                  <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
                    <p className="text-gray-700">
                      {ats_summary}
                    </p>
                  </div>
                </div>
              )}

              {job_details.description && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Job Description</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-700 whitespace-pre-line">
                      {job_details.description}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Skills Analysis Tab */}
          {activeTab === 'skills' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <CheckCircle2 className="text-green-600 mr-2" size={20} />
                  Matched Skills ({matchedSkillsCount})
                </h3>
                {analysis.matched_skills?.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {analysis.matched_skills.map((skill, index) => (
                      <SkillBadge key={index} skill={skill} type="matched" />
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 italic">No matched skills found</p>
                )}
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <AlertCircle className="text-orange-600 mr-2" size={20} />
                  Skills to Learn ({missingSkillsCount})
                </h3>
                {analysis.missing_skills?.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {analysis.missing_skills.map((skill, index) => (
                      <SkillBadge key={index} skill={skill} type="missing" />
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 italic">No missing skills identified</p>
                )}
              </div>
            </div>
          )}

          {/* Enhanced Learning Plan Tab */}
          {activeTab === 'learning' && (
            <div className="space-y-6">
              {/* Progress Bar */}
              <ProgressBar percentage={progressPercentage} />

              {/* Learning Plan */}
              {analysis.learning_plan?.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Lightbulb className="text-yellow-600 mr-2" size={20} />
                    Learning Plan ({analysis.learning_plan.length} items)
                  </h3>
                  <div className="space-y-3">
                    {analysis.learning_plan.map((item, index) => {
                      // Handle both string items and object items
                      if (typeof item === 'string') {
                        return (
                          <div key={index} className={`p-4 rounded-lg transition-all ${
                            completedItems.learningPlan[index] 
                              ? 'bg-green-50 border-l-4 border-green-400' 
                              : 'bg-yellow-50 border-l-4 border-yellow-400'
                          }`}>
                            <div className="flex items-start space-x-3">
                              <input
                                type="checkbox"
                                checked={completedItems.learningPlan[index] || false}
                                onChange={(e) => handleCheckboxChange('learningPlan', index, e.target.checked)}
                                className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                              />
                              <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded-full mr-3 mt-1">
                                {index + 1}
                              </span>
                              <p className={`text-gray-700 flex-1 ${
                                completedItems.learningPlan[index] ? 'line-through text-green-700' : ''
                              }`}>
                                {item}
                              </p>
                            </div>
                          </div>
                        )
                      } else {
                        // Handle object format with skill and resources
                        return (
                          <div key={index} className={`p-4 rounded-lg transition-all ${
                            completedItems.learningPlan[index] 
                              ? 'bg-green-50 border-l-4 border-green-400' 
                              : 'bg-yellow-50 border-l-4 border-yellow-400'
                          }`}>
                            <div className="flex items-start space-x-3">
                              <input
                                type="checkbox"
                                checked={completedItems.learningPlan[index] || false}
                                onChange={(e) => handleCheckboxChange('learningPlan', index, e.target.checked)}
                                className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                              />
                              <div className="flex-1">
                                <div className="flex items-center mb-3">
                                  <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded-full mr-3">
                                    {index + 1}
                                  </span>
                                  <h4 className={`text-lg font-medium text-gray-800 ${
                                    completedItems.learningPlan[index] ? 'line-through text-green-700' : ''
                                  }`}>
                                    {item.skill}
                                  </h4>
                                </div>
                                {item.resources && item.resources.length > 0 && (
                                  <div className="pl-8">
                                    <ul className="space-y-1">
                                      {item.resources.map((res, idx) => (
                                        <li key={idx} className="text-sm text-gray-700">
                                          <a
                                            href={res.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:underline"
                                          >
                                            • [{res.type}] {res.title}
                                          </a>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        )
                      }
                    })}
                  </div>
                </div>
              )}

              {/* YouTube Tutorials */}
              {analysis.youtube_links?.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Youtube className="text-red-600 mr-2" size={20} />
                    YouTube Tutorials ({youtubeLinksCount})
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {analysis.youtube_links.map((link, index) => (
                      <LinkCard 
                        key={index} 
                        link={link} 
                        type="youtube" 
                        index={index}
                        section="youtube"
                        isCompleted={completedItems.youtube[index] || false}
                        onToggle={(checked) => handleCheckboxChange('youtube', index, checked)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Online Courses / Web Links */}
              {analysis.serpapi_links?.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <ExternalLink className="text-blue-600 mr-2" size={20} />
                    Online Courses / Web Links ({serpapiLinksCount})
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {analysis.serpapi_links.map((link, index) => (
                      <LinkCard 
                        key={index} 
                        link={link} 
                        type="web" 
                        index={index}
                        section="resources"
                        isCompleted={completedItems.resources[index] || false}
                        onToggle={(checked) => handleCheckboxChange('resources', index, checked)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Show Questions Link when learning is complete */}
              {isLearningComplete && (
                <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg border border-green-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-600 text-sm font-medium">
                        🎉 Congratulations! You've completed all learning materials.
                      </p>
                      <p className="text-gray-600 text-sm mt-1">
                        Questions are now available in the Questions tab.
                      </p>
                    </div>
                    <button
                      onClick={() => setActiveTab('questions')}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                      View Questions
                    </button>
                  </div>
                </div>
              )}

              {(!analysis.learning_plan?.length && !analysis.youtube_links?.length && !analysis.serpapi_links?.length) && (
                <div className="text-center py-8">
                  <BookOpen className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-gray-500">No learning materials available</p>
                </div>
              )}
            </div>
          )}

          {/* Career Path Tab */}
          {activeTab === 'career' && (
            <div className="space-y-6">
              {analysis.career_path?.length > 0 ? (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <TrendingUp className="text-green-600 mr-2" size={20} />
                    Career Path Recommendations
                  </h3>
                  <div className="space-y-4">
                    {analysis.career_path.map((step, index) => (
                      <div key={index} className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg border-l-4 border-green-400">
                        <div className="flex items-start">
                          <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full mr-4 mt-1">
                            Step {index + 1}
                          </span>
                          <p className="text-gray-700 flex-1">{step}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <TrendingUp className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-gray-500">No career path recommendations available</p>
                </div>
              )}
            </div>
          )}

          {/* Questions Tab */}
          {activeTab === 'questions' && (
            <div className="space-y-6">
              {!isLearningComplete ? (
                <div className="text-center py-12">
                  <div className="bg-yellow-50 p-8 rounded-lg border border-yellow-200">
                    <HelpCircle className="mx-auto h-16 w-16 text-yellow-400 mb-4" />
                    <h3 className="text-lg font-semibold text-yellow-800 mb-2">
                      Complete Your Learning First
                    </h3>
                    <p className="text-yellow-700 mb-4">
                      You need to complete all learning materials ({progressPercentage}% done) before accessing the questions.
                    </p>
                    <button
                      onClick={() => setActiveTab('learning')}
                      className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                    >
                      Continue Learning
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {/* Celebration Message */}
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border border-green-200">
                    <div className="text-center">
                      <div className="text-4xl mb-2">🎉</div>
                      <h3 className="text-xl font-bold text-green-800 mb-2">
                        Congratulations! You've completed all learning materials.
                      </h3>
                      <p className="text-green-700">
                        Questions are now available below. Test your knowledge and prepare for interviews!
                      </p>
                    </div>
                  </div>

                  {/* Aptitude Questions */}
                  {analysis.aptitude_questions?.length > 0 && (
                    <QuestionSection
                      title="Aptitude Questions"
                      questions={analysis.aptitude_questions}
                      icon={HelpCircle}
                      bgColor="bg-purple-50"
                      textColor="text-purple-800"
                      showOptions={true}
                    />
                  )}

                  {/* Interview Questions */}
                  {analysis.interview_questions?.length > 0 && (
                    <QuestionSection
                      title="Interview Questions"
                      questions={analysis.interview_questions}
                      icon={Users}
                      bgColor="bg-indigo-50"
                      textColor="text-indigo-800"
                      showOptions={false}
                    />
                  )}

                  {(!analysis.aptitude_questions?.length && !analysis.interview_questions?.length) && (
                    <div className="text-center py-8">
                      <HelpCircle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                      <p className="text-gray-500">No questions available</p>
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {/* Resources Tab */}
          {activeTab === 'resources' && (
            <div className="space-y-6">
              {/* Learning Roadmap */}
              {analysis.learning_roadmap?.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <BookOpen className="text-blue-600 mr-2" size={20} />
                    Learning Roadmap ({analysis.learning_roadmap.length} steps)
                  </h3>
                  <div className="space-y-3">
                    {analysis.learning_roadmap.map((item, index) => (
                      <div key={index} className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
                        <div className="flex items-start">
                          <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full mr-4 mt-1">
                            Step {index + 1}
                          </span>
                          <p className="text-gray-700 flex-1">{item}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {analysis.youtube_links?.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Youtube className="text-red-600 mr-2" size={20} />
                    YouTube Learning Videos ({youtubeLinksCount})
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {analysis.youtube_links.map((link, index) => (
                      <LinkCard key={index} link={link} type="youtube" index={index} />
                    ))}
                  </div>
                </div>
              )}

              {analysis.serpapi_links?.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <ExternalLink className="text-blue-600 mr-2" size={20} />
                    Additional Learning Resources ({serpapiLinksCount})
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {analysis.serpapi_links.map((link, index) => (
                      <LinkCard key={index} link={link} type="web" index={index} />
                    ))}
                  </div>
                </div>
              )}

              {(!analysis.learning_roadmap?.length && !analysis.youtube_links?.length && !analysis.serpapi_links?.length) && (
                <div className="text-center py-8">
                  <ExternalLink className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-gray-500">No learning resources available</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Next Steps</h3>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => navigate('/jobs')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            Browse More Jobs
          </button>
          <button
            onClick={() => navigate('/profile')}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-medium transition-colors"
          >
            View All Applications
          </button>
          <button
            onClick={() => window.print()}
            className="bg-green-100 hover:bg-green-200 text-green-700 px-6 py-2 rounded-lg font-medium transition-colors"
          >
            Print Analysis
          </button>
        </div>
      </div>
    </div>
  )
}

export default ApplicationResult