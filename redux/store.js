import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import leadSlice from "./leadSlice";
import empSlice from "./empSlice";
import acceptSlice from "./acceptSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    leads: leadSlice,
    emp: empSlice,
    accptlead: acceptSlice,
  },
});
