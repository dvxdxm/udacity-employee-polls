import { login } from "../utils/api";
import { AUTHENTICATED_USER } from "../utils/constant";
import { showLoading, hideLoading } from "react-redux-loading-bar";

export const SET_AUTHED_USER = "SET_AUTHED_USER";

export function setAuthedUser(id) {
  return {
    type: SET_AUTHED_USER,
    id,
  };
}

export function handleLoginUser({ user, password }) {
  return (dispatch) => {
    dispatch(showLoading());

    return login({
      user,
      password,
    })
      .then((user) => {
        dispatch(setAuthedUser(user.id));
        localStorage.setItem(AUTHENTICATED_USER, user.id);
      })
      .then(() => dispatch(hideLoading()));
  };
}
