import axios from "axios";
import { API_BASE_URL } from "../config";

export const api = axios.create({
  baseURL: API_BASE_URL || "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
  }
});

/* 🔐 Attach admin JWT automatically */
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
