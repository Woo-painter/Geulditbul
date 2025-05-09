import { createSlice } from "@reduxjs/toolkit";

export const synonymSlice = createSlice({
  name: "synonym",
  initialState: {
    value: { word_result: [] },
  },
  reducers: {
    setWord: (state, action) => {
      state.value.word_result = [...action.payload];
    },
  },
});
export const { setWord } = synonymSlice.actions;

export default synonymSlice.reducer;
