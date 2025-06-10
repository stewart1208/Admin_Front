import axios from "axios";

const api = axios.create({
  //baseURL: "https://respectful-surprise-production.up.railway.app/admin",
  baseURL: "http://localhost:3013/admin",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
