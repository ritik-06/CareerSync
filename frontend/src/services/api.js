import axios from 'axios'

const API_BASE_URL = 'http://127.0.0.1:8000'

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const userToken = localStorage.getItem('userToken')
    const adminToken = localStorage.getItem('adminToken')
    
    // Add appropriate token based on endpoint
    if (config.url.includes('/admin/') && adminToken) {
      config.headers.Authorization = `Bearer ${adminToken}`
    } else if (config.url.includes('/user/') && userToken) {
      config.headers.Authorization = `Bearer ${userToken}`
    }
    
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('userToken')
      localStorage.removeItem('adminToken')
      localStorage.removeItem('userData')
      localStorage.removeItem('adminData')
      window.location.href = '/'
    }
    return Promise.reject(error)
  }
)

// User API calls
export const userAPI = {
  register: (userData) => api.post('/user/register', userData),
  login: (credentials) => api.post('/user/login', credentials),
  getProfile: () => api.get('/user/profile'),
  getAllJobs: () => api.get('/user/all-jobs'),
  getJobById: (jobId) => api.get(`/user/job/${jobId}`),
  applyJob: (formData) => api.post('/user/apply-job', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  getUserApplications: (userId) => api.get(`/user/user/${userId}/applications`),
  getApplicationAnalysis: (applicationId) => api.get(`/user/application/${applicationId}`),
}

// Admin API calls
export const adminAPI = {
  register: (adminData) => api.post('/admin/register', adminData),
  login: (credentials) => api.post('/admin/login', credentials),
  getDashboard: () => api.get('/admin/dashboard'),
  postJob: (jobData) => api.post('/admin/post-job', jobData),
  getAllJobs: () => api.get('/admin/all-jobs'),
  getApplications: (jobId) => api.get(`/admin/view-applications/${jobId}`),
  getOwnJobs: () => api.get('/admin/jobs')
}

// Public API calls
export const publicAPI = {
  getJobs: () => api.get('/admin/all-jobs'), // Assuming jobs are publicly accessible
}

// Analysis API calls
export const analysisAPI = {
  test: () => api.get('/analysis/test'),
}

export default api