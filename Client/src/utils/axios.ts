import axios from "axios"

const instance = axios.create({
  baseURL: "https://mern-sport-app.onrender.com/", // for production
  // baseURL: "http://localhost:5000/", // for local
  withCredentials: true,
})

axios.defaults.withCredentials = true

// instance.interceptors.request.use((config) => {
//   config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`

//   return config
// })

export default instance
