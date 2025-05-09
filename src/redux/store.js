import React from "react";
import { configureStore } from "@reduxjs/toolkit";
import onoffReducer from "./onoff";
import synonymReducer from "./synonym";

export default configureStore({
  reducer: {
    onoff: onoffReducer,
    synonym: synonymReducer,
  },
});
