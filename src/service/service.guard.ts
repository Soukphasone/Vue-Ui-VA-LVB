import axios from 'axios'

const service = axios.create()

service.interceptors.request.use(
  (consfig) => {
    consfig.headers['access-token'] = localStorage.getItem('authToken')
    return consfig
  },
  (err) => {
    return Promise.reject(err)
  }
)

service.interceptors.response.use(
  (res) => {
    return res
  },
  (err) => {
    return Promise.reject(err)
  }
)

export default service
