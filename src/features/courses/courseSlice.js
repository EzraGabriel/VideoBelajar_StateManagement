import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  courses: [],
  loading: true,
  hasLoaded: false,
};

const courseSlice = createSlice({
  name: "courses",

  initialState,

  reducers: {
    setCourses(state, action) {
      state.courses = action.payload;
      state.hasLoaded = true;
    },

    setLoading(state, action) {
      state.loading = action.payload;
    },

    deleteCourseFromState(state, action) {
      state.courses = state.courses.filter(
        (course) => String(course.id) !== String(action.payload),
      );
    },

    addCourse(state, action) {
      state.courses.push(action.payload);
    },
    updateCourse(state, action) {
      const index = state.courses.findIndex(
        (course) => String(course.id) === String(action.payload.id),
      );

      if (index !== -1) {
        state.courses[index] = action.payload;
      }
    },
  },
});

export const {
  setCourses,
  setLoading,
  deleteCourseFromState,
  addCourse,
  updateCourse,
} = courseSlice.actions;

export default courseSlice.reducer;
