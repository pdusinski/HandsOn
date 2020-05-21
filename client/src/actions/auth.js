import axios from "axios";
import setAuthToken from "../utilis/setAuthToken";
import { config } from "../utilis/config";
import { errorHandler } from "../utilis/errorHandler";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT
} from "./types";

//Load User
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("/api/auth");
    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};
//Login user
export const login = (email, password) => async dispatch => {
  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post("/api/auth", body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());
  } catch (err) {
    errorHandler(err, dispatch);

    dispatch({
      type: LOGIN_FAIL
    });
  }
};

// register user
export const register = ({
  name,
  email,
  password,
  admin
}) => async dispatch => {
  const body = JSON.stringify({ name, email, password, admin });

  try {
    const res = await axios.post("/api/users/", body, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());
  } catch (err) {
    errorHandler(err, dispatch);

    dispatch({
      type: REGISTER_FAIL
    });
  }
};

export const logout = () => async dispatch => {
  dispatch({
    type: LOGOUT
  });
};
