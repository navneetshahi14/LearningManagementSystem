'use client'
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slice/AuthSlice";
import CourseReducer from './Slice/CourseSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    course: CourseReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
