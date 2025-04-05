import axios from "axios";

// ==========================
// Create an Axios Instance
// ==========================
const api = axios.create({
  // Base URL for API requests, sourced from environment variables
  baseURL: import.meta.env.VITE_API_URL,
  // Include credentials like cookies with each request
  withCredentials: true,
  headers: {
    // Set content type to JSON for API requests
    "Content-Type": "application/json",
  },
});

// ==========================
// Export Axios Instance
// ==========================
export default api;
