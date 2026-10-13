import axios from "axios";

const authApi = axios.create({
  baseURL: import.meta.env.VITE_AUTH_API_URL || "http://localhost:5000/api/auth",
  headers: { "Content-Type": "application/json" },
});

export async function loginUser(credentials) {
  const response = await authApi.post("/login", credentials);
  return response.data.data;
}

export async function registerUser(details) {
  const response = await authApi.post("/signup", details);
  return response.data;
}

export async function verifyEmailToken(token) {
  const response = await authApi.post("/verifikasi-email", { token });
  return response.data;
}

export async function uploadProfileImage(file, token) {
  const formData = new FormData();
  formData.append("profileImage", file);
  const response = await authApi.post("/profile-image", formData, {
    headers: { Authorization: `Bearer ${token}`, "Content-Type": undefined },
  });
  return response.data.data.profileImage;
}

export function getApiOrigin() {
  return new URL(import.meta.env.VITE_AUTH_API_URL || "http://localhost:5000/api/auth").origin;
}

export function getAuthError(error) {
  return error.response?.data?.message || "Tidak dapat terhubung ke server. Coba lagi.";
}
