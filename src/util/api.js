import axios from 'axios'
import { getItem } from './localStorage'

const HOST = 'http://localhost:4000'

axios.interceptors.request.use((config) => {
  return {
    ...config,
    headers: {
      token: getItem('token'),
      'refresh-token': getItem('refreshToken')
    }
  }
}, (error) => {
  // Do something with request error
  return Promise.reject(error)
})

export const Auth = {
  async login ({ password, email }) {
    const res = await axios.post(`${HOST}/api/auth`, { credentials: { password, email } })
    return res.data
  },

  async signup ({ password, fullname, email }) {
    const res = await axios.post(`${HOST}/api/signup`, { user: { password, fullname, email } })
    return res.data
  }
}
