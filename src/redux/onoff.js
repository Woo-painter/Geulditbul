import { createSlice } from "@reduxjs/toolkit";

export const onoffSlice = createSlice({
  name: "onoff",
  initialState: {
    value: {
      spellChecker: false,
      synonym: false,
      loadingSynonym: false,
      reference: false,
    },
  },
  reducers: {
    toggleSpellChecker: (state) => {
      state.value.spellChecker = !state.value.spellChecker;
    },
    toggleSynonym: (state) => {
      state.value.synonym = !state.value.synonym;
    },
    toggleReference: (state) => {
      state.value.reference = !state.value.reference;
    },
    setLoadingSynonym: (state,action) => {
      state.value.loadingSynonym = action.payload;
    },
  },
});
export const {
  toggleSpellChecker,
  toggleSynonym,
  toggleReference,
  setLoadingSynonym,
} = onoffSlice.actions;

export default onoffSlice.reducer;
