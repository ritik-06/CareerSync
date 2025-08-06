// import React from 'react'
import React, { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { LogOut, User, Briefcase, Settings } from 'lucide-react'

const Navbar = () => {
  const { user, admin, logoutUser, logoutAdmin, isUserAuthenticated, isAdminAuthenticated } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    if (isUserAuthenticated) {
      logoutUser()
      navigate('/')
    } else if (isAdminAuthenticated) {
      logoutAdmin()
      navigate('/')
    }
  }

const [activeDropdown, setActiveDropdown] = useState(null);
const dropdownRef = useRef(null);

useEffect(() => {
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setActiveDropdown(null);
    }
  };
  document.addEventListener('mousedown', handleClickOutside);
  return () => document.removeEventListener('mousedown', handleClickOutside);
}, []);


 const [authType, setAuthType] = useState(null)
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-primary-600">
            JobRecruit
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-6">
            {/* User Navigation */}
            {isUserAuthenticated && (
              <>
                <Link
                  to="/jobs"
                  className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 transition-colors"
                >
                  <Briefcase size={18} />
                  <span>Jobs</span>
                </Link>
                <Link
                  to="/user/profile"
                  className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 transition-colors"
                >
                  <User size={18} />
                  <span>Profile</span>
                </Link>
              </>
            )}

            {/* Admin Navigation */}
            {isAdminAuthenticated && (
              <>
                <Link
                  to="/admin/dashboard"
                  className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 transition-colors"
                >
                  <Settings size={18} />
                  <span>Dashboard</span>
                </Link>
                <Link
                  to="/admin/post-job"
                  className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 transition-colors"
                >
                  <Briefcase size={18} />
                  <span>Post Job</span>
                </Link>
              </>
            )}

            {/* Authentication Buttons */}
            {/* {!isUserAuthenticated && !isAdminAuthenticated ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Link
                    to="/user/login"
                    className="text-gray-700 hover:text-primary-600 transition-colors"
                  >
                    User Login
                  </Link>
                  <span className="text-gray-400">|</span>
                  <Link
                    to="/user/register"
                    className="text-gray-700 hover:text-primary-600 transition-colors"
                  >
                    Register
                  </Link>
                </div>
                <div className="flex items-center space-x-2">
                  <Link
                    to="/admin/login"
                    className="btn-primary"
                  >
                    Admin Login
                  </Link>
                </div>
              </div>
            ) : ( */}
            {/* {!isUserAuthenticated && !isAdminAuthenticated ? (
                <div className="relative flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                    <button
                        onClick={() => setAuthType(authType === 'user' ? null : 'user')}
                        className="text-gray-700 hover:text-primary-600 transition-colors"
                    >
                        User
                    </button>
                    <span className="text-gray-400">|</span>
                    <button
                        onClick={() => setAuthType(authType === 'admin' ? null : 'admin')}
                        className="text-gray-700 hover:text-primary-600 transition-colors"
                    >
                        Admin
                    </button>
                    </div>

                    {authType === 'user' && (
                    <div className="absolute top-10 bg-white shadow-md rounded-lg px-4 py-2 space-y-2 z-10">
                        <Link
                        to="/user/login"
                        className="block text-gray-700 hover:text-primary-600"
                        >
                        User Login
                        </Link>
                        <Link
                        to="/user/register"
                        className="block text-gray-700 hover:text-primary-600"
                        >
                        User Register
                        </Link>
                    </div>
                    )}

                    {authType === 'admin' && (
                    <div className="absolute top-10 bg-white shadow-md rounded-lg px-4 py-2 space-y-2 z-10">
                        <Link
                        to="/admin/login"
                        className="block text-gray-700 hover:text-primary-600"
                        >
                        Admin Login
                        </Link>
                        <Link
                        to="/admin/register"
                        className="block text-gray-700 hover:text-primary-600"
                        >
                        Admin Register
                        </Link>
                    </div>
                    )}
                </div>
                ):(
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">
                  Welcome, {user?.name || admin?.username}
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-gray-700 hover:text-red-600 transition-colors"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </div>
            )} */}
            {!isUserAuthenticated && !isAdminAuthenticated ? (
              <div className="relative flex items-center space-x-6 pr-6" ref={dropdownRef}>
                {/* USER MENU */}
                <div className="relative">
                  <button
                    onClick={() => setActiveDropdown(activeDropdown === 'user' ? null : 'user')}
                    className="text-gray-800 font-medium px-4 py-2 rounded-md hover:bg-blue-100 transition-all"
                  >
                    User
                  </button>
                  {activeDropdown === 'user' && (
                    <div className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-md py-2 w-40 z-50">
                      <Link
                        to="/user/login"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 hover:text-blue-700"
                        onClick={() => setActiveDropdown(null)}
                      >
                        User Login
                      </Link>
                      <Link
                        to="/user/register"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 hover:text-blue-700"
                        onClick={() => setActiveDropdown(null)}
                      >
                        User Register
                      </Link>
                    </div>
                  )}
                </div>

                {/* Divider */}
                <span className="text-gray-400">|</span>

                {/* ADMIN MENU */}
                <div className="relative">
                  <button
                    onClick={() => setActiveDropdown(activeDropdown === 'admin' ? null : 'admin')}
                    className="text-gray-800 font-medium px-4 py-2 rounded-md hover:bg-blue-100 transition-all"
                  >
                    Admin
                  </button>
                  {activeDropdown === 'admin' && (
                    <div className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-md py-2 w-40 z-50">
                      <Link
                        to="/admin/login"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 hover:text-blue-700"
                        onClick={() => setActiveDropdown(null)}
                      >
                        Admin Login
                      </Link>
                      <Link
                        to="/admin/register"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 hover:text-blue-700"
                        onClick={() => setActiveDropdown(null)}
                      >
                        Admin Register
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">
                  Welcome, {user?.name || admin?.username}
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-gray-700 hover:text-red-600 transition-colors"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar