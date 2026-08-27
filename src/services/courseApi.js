import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getCourses = async () => {
  const response = await axios.get(API_URL);

  return response.data;
};

export const addCourseData = async (course) => {
  const response = await axios.post(API_URL, course);

  return response.data;
};

export const getCourseById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);

  return response.data;
};

export const updateCourseData = async (id, course) => {
  const response = await axios.put(`${API_URL}/${id}`, course);

  return response.data;
};

export const deleteCourse = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);

  return response.data;
};
