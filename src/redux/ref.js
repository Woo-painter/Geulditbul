import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name_result: [],
  link_result: [],
  isActive: true,
  secondsLeft: 0,
};

export const refSlice = createSlice({
  name: "ref",
  initialState: {
    value: initialState,
  },
  reducers: {
    setRef: (state, action) => {
      state.value.name_result = [...action.payload.name_result];
      state.value.link_result = [...action.payload.link_result];
    },
    startCooldown: (state) => {
      state.value.isActive = false;
      state.value.secondsLeft = 30;
    },
    tick: (state) => {
      if (state.value.secondsLeft > 0) {
        state.value.secondsLeft -= 1;
      }
      if (state.value.secondsLeft === 0) {
        state.value.isActive = true;
      }
    },
  },
});
export const { setRef, tick, startCooldown } = refSlice.actions;

export default refSlice.reducer;
