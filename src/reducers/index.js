import { combineReducers } from "redux";
import authedUser from "./authedUser";
import users from "./users";
// import tweets from "./tweets";
import questions from "./questions";
import { loadingBarReducer } from "react-redux-loading-bar";

export default combineReducers({
  authedUser,
  users,
  questions,
  // tweets,
  loadingBar: loadingBarReducer,
});
