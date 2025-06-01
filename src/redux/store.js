import React from "react";
import { configureStore } from "@reduxjs/toolkit";
import onoffReducer from "./onoff";
import synonymReducer from "./synonym";
import refReducer from "./ref";
import spellReducer from "./spell";
import postReducer from "./post"
export default configureStore({
  reducer: {
    onoff: onoffReducer,
    synonym: synonymReducer,
    ref: refReducer,
    spell: spellReducer,
    posts: postReducer
  },
});
