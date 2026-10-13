import axios from "axios";
import { getSession } from "../utils/auth";

const courseApi = axios.create({ baseURL: import.meta.env.VITE_API_URL });

courseApi.interceptors.request.use((config) => {
  const token = getSession()?.token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const getCourses = async (filters = {}) => {
  const params = Object.fromEntries(
    Object.entries(filters).filter(([, value]) => value !== undefined && value !== ""),
  );
  const response = await courseApi.get("/", { params });

  return response.data.data;
};

export const addCourseData = async (course) => {
  const response = await courseApi.post("/", course);

  return response.data.data;
};

export const getCourseById = async (id) => {
  const response = await courseApi.get(`/${id}`);

  return response.data.data;
};

export const updateCourseData = async (id, course) => {
  const response = await courseApi.put(`/${id}`, course);

  return response.data.data;
};

export const deleteCourse = async (id) => {
  const response = await courseApi.delete(`/${id}`);

  return response.data.data;
};
