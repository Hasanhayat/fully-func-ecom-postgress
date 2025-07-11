import axios from "axios";

let baseURL = "";

const hostname = window.location.hostname;
const protocol = window.location.protocol;

if (hostname === "buytech-lilac.vercel.app") {
  baseURL = "https://fully-func-ecom-postgress.vercel.app/api/v1";
} else if (protocol === "http:") {
  baseURL = "http://localhost:3002/api/v1";
} else if (protocol === "https:") {
  baseURL = "/api/v1"; // relative path for same-origin requests
}

const api = axios.create({
  baseURL,
  withCredentials: true,
});

export default api;
