import axios from "axios";
import { getAdminToken } from "../auth/session";

const baseURL = import.meta.env.VITE_API_URL || "http://localhost:3333/api";

const httpClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

httpClient.interceptors.request.use((config) => {
  const token = getAdminToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default httpClient;
