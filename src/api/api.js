import axios from 'axios'

const api = axios.create({
  baseURL: 'https://back-tapdog.denevijw.beget.tech'
})

api.interceptors.request.use(
  async (config) => {

    config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`

    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default api