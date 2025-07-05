import axios from "axios";

const api = axios.create({
  baseURL: "https://fully-func-ecom-postgress.vercel.app/api/v1",
  withCredentials: true,
});
export default api;