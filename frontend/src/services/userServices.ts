import { UserProps } from "../Interfaces/interfaces"; // Importing the UserProps type to define user data structure
import api from "./api"; // Importing the configured axios instance for API calls

// ==========================
// Register API Call
// ==========================
export const registerApi = async ({ email, password }: UserProps) => {
  // Making a POST request to register a new user with email and password
  const res = await api.post("/register", { email, password });
  return res; // Returning the response from the API
};

// ==========================
// Login API Call
// ==========================
export const loginApi = async ({ email, password }: UserProps) => {
  // Making a POST request to log in a user with email and password
  const res = await api.post("/login", { email, password });
  return res; // Returning the response from the API
};

// ==========================
// Logout API Call
// ==========================
export const logoutApi = async () => {
  // Making a POST request to log out the current user
  const res = await api.post("/logout");
  return res; // Returning the response from the API
};

// ==========================
// Validate Token API Call
// ==========================
export const validateTokenApi = async () => {
  // Making a GET request to validate the current user's authentication token
  const res = await api.get("/validate_token");
  return res; // Returning the response from the API
};
