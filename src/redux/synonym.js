import { createSlice } from "@reduxjs/toolkit";

const initialState = { word_result: [], from: 0, to: 0 };

export const synonymSlice = createSlice({
  name: "synonym",
  initialState: {
    value: initialState,
  },
  reducers: {
    setWord: (state, action) => {
      state.value.word_result = [...action.payload.result];
      state.value.from = action.payload.from;
      state.value.to = action.payload.to;
    },
    resetValue: (state) => {
      state.value = initialState;
    },
  },
});
export const { setWord, resetValue } = synonymSlice.actions;

export default synonymSlice.reducer;
