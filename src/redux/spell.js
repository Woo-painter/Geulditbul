import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  check_result: [],
  original_text: "",
  checked_text: "",
  point: 0,
};

export const spellSlice = createSlice({
  name: "spell",
  initialState: {
    value: initialState,
  },
  reducers: {
    setCheck: (state, action) => {
      state.value.check_result = [...action.payload.corrections];
      state.value.original_text = action.payload.original_text;
      state.value.checked_text = action.payload.checked_text;
    },
    remove: (state, action) => {
      state.value.check_result.splice(action.payload.idx, 1);
    },
    reset: (state) => {
      state.value = initialState;
    },
    save: (state, action) => {
      state.value.point = action.payload.point;
    },
  },
});
export const { setCheck, remove, reset, save } = spellSlice.actions;

export default spellSlice.reducer;
