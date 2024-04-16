import { configureStore } from "@reduxjs/toolkit";
import selectedOptionReducer from "../features/selectedOption/selectedOptionSlice";

const store = configureStore({
  reducer: {
    selectedOption: selectedOptionReducer,
  },
});

export default store;
