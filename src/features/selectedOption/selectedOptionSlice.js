import { createSlice } from "@reduxjs/toolkit";

export const selectedOptionSlice = createSlice({
  name: "selectedOption",
  initialState: {
    selectedOption: "popular",
  },
  reducers: {
    selectOption: (state, action) => {
      state.selectedOption = action.payload;
    },
  },
});

export const { selectOption } = selectedOptionSlice.actions;

export default selectedOptionSlice.reducer;
