// import React from 'react'
// import { useLocation, Link } from 'react-router-dom'
// import { CheckCircle, XCircle, BookOpen, Play, ExternalLink, ArrowLeft } from 'lucide-react'

// const ApplicationResult = () => {
//   console.log("ApplicationResult component loaded");
//   const location = useLocation()
//   const { applicationData, jobTitle } = location.state || {}

//   if (!applicationData) {
//     return (
//       <div className="text-center py-12">
//         <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded max-w-md mx-auto">
//           No application data found. Please apply to a job first.
//         </div>
//         <Link to="/jobs" className="mt-4 inline-block btn-primary">
//           Browse Jobs
//         </Link>
//       </div>
//     )
//   }

//   const {
//     matched_skills = [],
//     missing_skills = [],
//     learning_plan = [],
//     youtube_links = [],
//     serpapi_links = []
//   } = applicationData

//   return (
//     <div className="max-w-4xl mx-auto">
//       {/* Success Header */}
//       <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
//         <div className="flex items-center">
//           <CheckCircle className="text-green-600 mr-3" size={24} />
//           <div>
//             <h1 className="text-2xl font-bold text-green-900">Application Submitted Successfully!</h1>
//             <p className="text-green-700 mt-1">
//               Your application for <strong>{jobTitle}</strong> has been analyzed and submitted.
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Navigation */}
//       <div className="mb-6">
//         <Link 
//           to="/jobs" 
//           className="inline-flex items-center text-primary-600 hover:text-primary-700 transition-colors"
//         >
//           <ArrowLeft size={18} className="mr-2" />
//           Back to Jobs
//         </Link>
//       </div>

//       <div className="grid lg:grid-cols-2 gap-8">
//         {/* Skills Analysis */}
//         <div className="space-y-6">
//           {/* Matched Skills */}
//           <div className="bg-white rounded-lg shadow-md p-6">
//             <div className="flex items-center mb-4">
//               <CheckCircle className="text-green-600 mr-3" size={20} />
//               <h2 className="text-xl font-semibold text-gray-900">Matched Skills</h2>
//             </div>
            
//             {matched_skills.length > 0 ? (
//               <div className="flex flex-wrap gap-2">
//                 {matched_skills.map((skill, index) => (
//                   <span
//                     key={index}
//                     className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full flex items-center"
//                   >
//                     <CheckCircle size={14} className="mr-1" />
//                     {skill}
//                   </span>
//                 ))}
//               </div>
//             ) : (
//               <p className="text-gray-600">No matching skills identified.</p>
//             )}
//           </div>

//           {/* Missing Skills */}
//           <div className="bg-white rounded-lg shadow-md p-6">
//             <div className="flex items-center mb-4">
//               <XCircle className="text-red-600 mr-3" size={20} />
//               <h2 className="text-xl font-semibold text-gray-900">Skills to Improve</h2>
//             </div>
            
//             {missing_skills.length > 0 ? (
//               <div className="flex flex-wrap gap-2">
//                 {missing_skills.map((skill, index) => (
//                   <span
//                     key={index}
//                     className="bg-red-100 text-red-800 text-sm px-3 py-1 rounded-full flex items-center"
//                   >
//                     <XCircle size={14} className="mr-1" />
//                     {skill}
//                   </span>
//                 ))}
//               </div>
//             ) : (
//               <p className="text-gray-600">Great! You have all the required skills.</p>
//             )}
//           </div>

//           {/* Learning Plan */}
//           {learning_plan.length > 0 && (
//             <div className="bg-white rounded-lg shadow-md p-6">
//               <div className="flex items-center mb-4">
//                 <BookOpen className="text-blue-600 mr-3" size={20} />
//                 <h2 className="text-xl font-semibold text-gray-900">Learning Roadmap</h2>
//               </div>
              
//               <div className="space-y-3">
//                 {learning_plan.map((item, index) => (
//                   <div key={index} className="flex items-start">
//                     <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5">
//                       {index + 1}
//                     </div>
//                     <p className="text-gray-700">{item}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Learning Resources */}
//         <div className="space-y-6">
//           {/* YouTube Resources */}
//           {youtube_links.length > 0 && (
//             <div className="bg-white rounded-lg shadow-md p-6">
//               <div className="flex items-center mb-4">
//                 <Play className="text-red-600 mr-3" size={20} />
//                 <h2 className="text-xl font-semibold text-gray-900">YouTube Tutorials</h2>
//               </div>
              
//               <div className="space-y-3">
//                 {youtube_links.map((link, index) => (
//                   <a
//                     key={index}
//                     href={link}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="block p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
//                   >
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center">
//                         <Play className="text-red-600 mr-2" size={16} />
//                         <span className="text-gray-900">Tutorial {index + 1}</span>
//                       </div>
//                       <ExternalLink className="text-gray-400" size={16} />
//                     </div>
//                     <p className="text-sm text-gray-600 mt-1 truncate">{link}</p>
//                   </a>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Online Courses */}
//           {serpapi_links.length > 0 && (
//             <div className="bg-white rounded-lg shadow-md p-6">
//               <div className="flex items-center mb-4">
//                 <BookOpen className="text-purple-600 mr-3" size={20} />
//                 <h2 className="text-xl font-semibold text-gray-900">Online Courses</h2>
//               </div>
              
//               <div className="space-y-3">
//                 {serpapi_links.map((link, index) => (
//                   <a
//                     key={index}
//                     href={link}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="block p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
//                   >
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center">
//                         <BookOpen className="text-purple-600 mr-2" size={16} />
//                         <span className="text-gray-900">Course {index + 1}</span>
//                       </div>
//                       <ExternalLink className="text-gray-400" size={16} />
//                     </div>
//                     <p className="text-sm text-gray-600 mt-1 truncate">{link}</p>
//                   </a>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Next Steps */}
//           <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
//             <h3 className="text-lg font-semibold text-blue-900 mb-3">What's Next?</h3>
//             <ul className="text-blue-800 space-y-2">
//               <li className="flex items-start">
//                 <CheckCircle className="text-blue-600 mr-2 mt-0.5 flex-shrink-0" size={16} />
//                 <span className="text-sm">Your application has been sent to the employer</span>
//               </li>
//               <li className="flex items-start">
//                 <CheckCircle className="text-blue-600 mr-2 mt-0.5 flex-shrink-0" size={16} />
//                 <span className="text-sm">You'll be notified if you're selected for the next round</span>
//               </li>
//               <li className="flex items-start">
//                 <CheckCircle className="text-blue-600 mr-2 mt-0.5 flex-shrink-0" size={16} />
//                 <span className="text-sm">Use the learning resources to improve your skills</span>
//               </li>
//               <li className="flex items-start">
//                 <CheckCircle className="text-blue-600 mr-2 mt-0.5 flex-shrink-0" size={16} />
//                 <span className="text-sm">Continue applying to more positions</span>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </div>

//       {/* Action Buttons */}
//       <div className="mt-8 flex justify-center space-x-4">
//         <Link to="/jobs" className="btn-primary">
//           Apply to More Jobs
//         </Link>
//         <Link to="/user/profile" className="btn-secondary">
//           View Profile
//         </Link>
//       </div>
//     </div>
//   )
// }

// export default ApplicationResult










import React from 'react'
import { useLocation, Link } from 'react-router-dom'
import { CheckCircle, XCircle, BookOpen, Play, ExternalLink, ArrowLeft } from 'lucide-react'

const ApplicationResult = () => {
  console.log("ApplicationResult component loaded");
  const location = useLocation()
  const { applicationData, jobTitle } = location.state || {}

  if (!applicationData) {
    return (
      <div className="text-center py-12">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded max-w-md mx-auto">
          No application data found. Please apply to a job first.
        </div>
        <Link to="/jobs" className="mt-4 inline-block btn-primary">
          Browse Jobs
        </Link>
      </div>
    )
  }

  const {
    matched_skills = [],
    missing_skills = [],
    learning_plan = [],
    youtube_links = [],
    serpapi_links = [],
    learning_roadmap = [],
    career_path = [],
  } = applicationData

  return (
    <div className="max-w-4xl mx-auto">
      {/* Success Header */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
        <div className="flex items-center">
          <CheckCircle className="text-green-600 mr-3" size={24} />
          <div>
            <h1 className="text-2xl font-bold text-green-900">Application Submitted Successfully!</h1>
            <p className="text-green-700 mt-1">
              Your application for <strong>{jobTitle}</strong> has been analyzed and submitted.
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="mb-6">
        <Link 
          to="/jobs" 
          className="inline-flex items-center text-primary-600 hover:text-primary-700 transition-colors"
        >
          <ArrowLeft size={18} className="mr-2" />
          Back to Jobs
        </Link>
      </div>

      <div className="grid lg:grid-cols-1 gap-8">
        {/* Skills Analysis */}
        <div className="space-y-6">
          {/* Matched Skills */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <CheckCircle className="text-green-600 mr-3" size={20} />
              <h2 className="text-xl font-semibold text-gray-900">Matched Skills</h2>
            </div>
            
            {matched_skills.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {matched_skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full flex items-center"
                  >
                    <CheckCircle size={14} className="mr-1" />
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No matching skills identified.</p>
            )}
          </div>

          {/* Missing Skills */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <XCircle className="text-red-600 mr-3" size={20} />
              <h2 className="text-xl font-semibold text-gray-900">Skills to Improve</h2>
            </div>
            
            {missing_skills.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {missing_skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-red-100 text-red-800 text-sm px-3 py-1 rounded-full flex items-center"
                  >
                    <XCircle size={14} className="mr-1" />
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">Great! You have all the required skills.</p>
            )}
          </div>

          {/* Learning Plan */}
          {learning_plan.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <BookOpen className="text-blue-600 mr-3" size={20} />
                <h2 className="text-xl font-semibold text-gray-900">Learning Roadmap</h2>
              </div>

              <div className="space-y-6">
                {learning_plan.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center">
                      <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3">
                        {index + 1}
                      </div>
                      <h3 className="text-lg font-medium text-gray-800">{item.skill}</h3>
                    </div>
                    <ul className="pl-9 space-y-1">
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
                ))}
              </div>
            </div>
          )}

          {/* Learning Roadmap */}
          {learning_roadmap.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <BookOpen className="text-indigo-600 mr-3" size={20} />
                <h2 className="text-xl font-semibold text-gray-900">Learning Plan</h2>
              </div>

              <ol className="list-decimal pl-6 text-gray-800 space-y-2">
                {learning_roadmap.map((step, index) => (
                  <li key={index} className="text-sm">{step}</li>
                ))}
              </ol>
            </div>
          )}

          {/* Career Path */}
          {career_path.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <BookOpen className="text-amber-600 mr-3" size={20} />
                <h2 className="text-xl font-semibold text-gray-900">Career Path</h2>
              </div>

              <ul className="list-disc pl-6 text-gray-800 space-y-2">
                {career_path.map((step, index) => (
                  <li key={index} className="text-sm">{step}</li>
                ))}
              </ul>
            </div>
          )}

        </div>

        {/* Learning Resources */}
        <div className="space-y-6">
          {/* YouTube Resources */}
          {youtube_links.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <Play className="text-red-600 mr-3" size={20} />
                <h2 className="text-xl font-semibold text-gray-900">YouTube Tutorials</h2>
              </div>
              
              <div className="space-y-3">
                {youtube_links.map((link, index) => (
                  <a
                    key={index}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Play className="text-red-600 mr-2" size={16} />
                        <span className="text-gray-900">Tutorial {index + 1}</span>
                      </div>
                      <ExternalLink className="text-gray-400" size={16} />
                    </div>
                    <p className="text-sm text-gray-600 mt-1 truncate">{link}</p>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Online Courses */}
          {serpapi_links.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <BookOpen className="text-purple-600 mr-3" size={20} />
                <h2 className="text-xl font-semibold text-gray-900">Online Courses</h2>
              </div>
              
              <div className="space-y-3">
                {serpapi_links.map((link, index) => (
                  <a
                    key={index}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <BookOpen className="text-purple-600 mr-2" size={16} />
                        <span className="text-gray-900">Course {index + 1}</span>
                      </div>
                      <ExternalLink className="text-gray-400" size={16} />
                    </div>
                    <p className="text-sm text-gray-600 mt-1 truncate">{link}</p>
                  </a>
                ))}
              </div>
            </div>
          )}


          {/* Next Steps */}
          {/* <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">What's Next?</h3>
            <ul className="text-blue-800 space-y-2">
              <li className="flex items-start">
                <CheckCircle className="text-blue-600 mr-2 mt-0.5 flex-shrink-0" size={16} />
                <span className="text-sm">Your application has been sent to the employer</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="text-blue-600 mr-2 mt-0.5 flex-shrink-0" size={16} />
                <span className="text-sm">You'll be notified if you're selected for the next round</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="text-blue-600 mr-2 mt-0.5 flex-shrink-0" size={16} />
                <span className="text-sm">Use the learning resources to improve your skills</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="text-blue-600 mr-2 mt-0.5 flex-shrink-0" size={16} />
                <span className="text-sm">Continue applying to more positions</span>
              </li>
            </ul>
          </div> */}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex justify-center space-x-4">
        <Link to="/jobs" className="btn-primary">
          Apply to More Jobs
        </Link>
        <Link to="/user/profile" className="btn-secondary">
          View Profile
        </Link>
      </div>
    </div>
  )
}

export default ApplicationResult