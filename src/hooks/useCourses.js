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

export function useCourses(filters = {}) {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.courses.courses);
  const loading = useSelector((state) => state.courses.loading);
  const category = filters.category ?? "";
  const search = filters.search ?? "";
  const sort = filters.sort ?? "";
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
    let active = true;
    dispatch(setLoading(true));
    getCourses({ category, search, sort })
      .then((data) => {
        if (active) dispatch(setCourses(data));
      })
      .catch((error) => {
        console.error("Gagal memuat kelas:", error);
        if (active) dispatch(setCourses([]));
      })
      .finally(() => {
        if (active) dispatch(setLoading(false));
      });

    return () => {
      active = false;
    };
  }, [dispatch, category, search, sort]);

  return {
    courses,
    loading,
    removeCourse,
    editCourse,
    addNewCourse,
  };
}
