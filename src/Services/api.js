import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
 // baseURL: "https://wrong-sofa-production.up.railway.app/admin",
 baseURL:"http://localhost:3000/admin",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
api.interceptors.request.use(
  (config) => {
    setTimeout(() => {
      const token = Cookies.get("token"); // Récupère le token avec un petit délai
      console.log(token)
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }, 100); // 100ms de délai
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
