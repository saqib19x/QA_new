import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import leadSlice from "./leadSlice";
import empSlice from "./empSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    leads: leadSlice,
    emp: empSlice,
  },
});
