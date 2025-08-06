// import React from 'react'
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
// import { AuthProvider } from './context/AuthContext'
// import Navbar from './components/Navbar'
// import ProtectedRoute from './components/ProtectedRoute'

// // User Pages
// import UserLogin from './pages/user/UserLogin'
// import UserRegister from './pages/user/UserRegister'
// import UserProfile from './pages/user/UserProfile'
// import JobListings from './pages/user/JobListings'
// import ApplyJob from './pages/user/ApplyJob'
// import ApplicationResult from './pages/user/ApplicationResult'

// // Admin Pages
// import AdminLogin from './pages/admin/AdminLogin'
// import AdminRegister from './pages/admin/AdminRegister'
// import AdminDashboard from './pages/admin/AdminDashboard'
// import PostJob from './pages/admin/PostJob'
// import ViewApplications from './pages/admin/ViewApplications'

// // Public Pages
// import Home from './pages/Home'

// function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         <div className="min-h-screen bg-gray-50">
//           <Navbar />
//           <main className="container mx-auto px-4 py-8">
//             <Routes>
//               {/* Public Routes */}
//               <Route path="/" element={<Home />} />
              
//               {/* User Routes */}
//               <Route path="/user/login" element={<UserLogin />} />
//               <Route path="/user/register" element={<UserRegister />} />
//               <Route 
//                 path="/user/profile" 
//                 element={
//                   <ProtectedRoute userType="user">
//                     <UserProfile />
//                   </ProtectedRoute>
//                 } 
//               />
//               <Route 
//                 path="/jobs" 
//                 element={
//                   <ProtectedRoute userType="user">
//                     <JobListings />
//                   </ProtectedRoute>
//                 } 
//               />
//               <Route 
//                 path="/apply/:jobId" 
//                 element={
//                   <ProtectedRoute userType="user">
//                     <ApplyJob />
//                   </ProtectedRoute>
//                 } 
//               />
//               <Route 
//                 path="/application-result" 
//                 element={
//                   <ProtectedRoute userType="user">
//                     <ApplicationResult />
//                   </ProtectedRoute>
//                 } 
//               />
              
//               {/* Admin Routes */}
//               <Route path="/admin/login" element={<AdminLogin />} />
//               <Route path="/admin/register" element={<AdminRegister />} />
//               <Route 
//                 path="/admin/dashboard" 
//                 element={
//                   <ProtectedRoute userType="admin">
//                     <AdminDashboard />
//                   </ProtectedRoute>
//                 } 
//               />
//               <Route 
//                 path="/admin/post-job" 
//                 element={
//                   <ProtectedRoute userType="admin">
//                     <PostJob />
//                   </ProtectedRoute>
//                 } 
//               />
//               <Route 
//                 path="/admin/applications/:jobId" 
//                 element={
//                   <ProtectedRoute userType="admin">
//                     <ViewApplications />
//                   </ProtectedRoute>
//                 } 
//               />
              
//               {/* Fallback */}
//               <Route path="*" element={<Navigate to="/" replace />} />
//             </Routes>
//           </main>
//         </div>
//       </Router>
//     </AuthProvider>
//   )
// }

// export default App






import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'

// User Pages
import UserLogin from './pages/user/UserLogin'
import UserRegister from './pages/user/UserRegister'
import UserProfile from './pages/user/UserProfile'
import JobListings from './pages/user/JobListings'
import ApplyJob from './pages/user/ApplyJob'
import ApplicationResult from './pages/user/ApplicationResult'
import AnalysisResult from './pages/user/AnalysisResult'

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin'
import AdminRegister from './pages/admin/AdminRegister'
import AdminDashboard from './pages/admin/AdminDashboard'
import PostJob from './pages/admin/PostJob'
import ViewApplications from './pages/admin/ViewApplications'

// Public Pages
import Home from './pages/Home'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              
              {/* User Routes */}
              <Route path="/user/login" element={<UserLogin />} />
              <Route path="/user/register" element={<UserRegister />} />
              <Route 
                path="/user/profile" 
                element={
                  <ProtectedRoute userType="user">
                    <UserProfile />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/jobs" 
                element={
                  <ProtectedRoute userType="user">
                    <JobListings />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/apply/:jobId" 
                element={
                  <ProtectedRoute userType="user">
                    <ApplyJob />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/application-result" 
                element={
                  <ProtectedRoute userType="user">
                    <ApplicationResult />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/application/:applicationId" 
                element={
                  <ProtectedRoute userType="user">
                    <AnalysisResult />
                  </ProtectedRoute>
                } 
              />
              
              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/register" element={<AdminRegister />} />
              <Route 
                path="/admin/dashboard" 
                element={
                  <ProtectedRoute userType="admin">
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/post-job" 
                element={
                  <ProtectedRoute userType="admin">
                    <PostJob />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/applications/:jobId" 
                element={
                  <ProtectedRoute userType="admin">
                    <ViewApplications />
                  </ProtectedRoute>
                } 
              />
              
              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
