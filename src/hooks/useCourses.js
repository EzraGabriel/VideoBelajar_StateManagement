import { useEffect } from "react";
import {
  getCourses,
  addCourseData,
  deleteCourse,
  updateCourseData,
} from "../services/courseApi";
import { useDispatch, useSelector } from "react-redux";

import {
  setCourses,
  setLoading,
  deleteCourseFromState,
  updateCourse,
  addCourse,
} from "../features/courses/courseSlice";

export function useCourses() {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.courses.courses);
  const loading = useSelector((state) => state.courses.loading);
  async function fetchCourses() {
    try {
      const data = await getCourses();
      dispatch(setCourses(data));
    } finally {
      dispatch(setLoading(false));
    }
  }
  async function removeCourse(id) {
    await deleteCourse(id);

    dispatch(deleteCourseFromState(id));
  }
  async function addNewCourse(course) {
    const newCourse = await addCourseData(course);

    dispatch(addCourse(newCourse));
  }

  async function editCourse(id, data) {
    const updatedData = await updateCourseData(id, data);

    dispatch(updateCourse(updatedData));
  }

  useEffect(() => {
    fetchCourses();
  }, []);

  return {
    courses,
    loading,
    removeCourse,
    editCourse,
    addNewCourse,
  };
}
