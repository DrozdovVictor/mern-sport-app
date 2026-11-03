import axios from "axios"

const instance = axios.create({
  // baseURL: import.meta.env.VITE_API_URL,
  baseURL: "http://localhost:5000/",
  withCredentials: true,
})

axios.defaults.withCredentials = true

// instance.interceptors.request.use((config) => {
//   config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`

//   return config
// })

export default instance
