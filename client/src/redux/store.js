import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

import user from "./actions/user";
import ui from "./actions/ui";
import presenters from "./actions/presenters";

const reducer = combineReducers({
  user,
  ui,
  presenters,
});

const store = configureStore({
  reducer,
});

export default store;
