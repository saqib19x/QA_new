import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accptlead: [],
};

export const acceptSlice = createSlice({
  name: "accptlead",
  initialState,
  reducers: {
    setAcceptLead: (state, action) => {
      state.accptlead = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAcceptLead } = acceptSlice.actions;

export default acceptSlice.reducer;
