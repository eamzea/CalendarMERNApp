import { uiReducer } from "./uiReducers";

const { combineReducers } = require("redux");

export const rootReducer = combineReducers({
  ui: uiReducer,
});
