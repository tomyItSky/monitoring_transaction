import axios from "axios";

export const configAPI = axios.create({
  baseURL: "http://localhost:5002",
  // baseURL: "https://dev-valetapi.skyparking.online",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
