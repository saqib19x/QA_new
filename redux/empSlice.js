import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  emp: [],
};

export const empSlice = createSlice({
  name: "emp",
  initialState,
  reducers: {
    setEmps(state, action) {
      state.emp = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setEmps } = empSlice.actions;

export default empSlice.reducer;
