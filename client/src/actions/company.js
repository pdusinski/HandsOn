import {
  ADD_MEMBER,
  ADD_MEMBER_FAIL,
  ADD_COMPANY,
  ADD_COMPANY_FAIL,
  ADD_TEAM,
  ADD_TEAM_FAIL,
  ADD_WORKER,
  CONNECT_WITH,
  CONNECT_WITH_FAIL,
  REMOVE_MEMBER,
  REMOVE_MEMBER_FAIL,
  ADD_WORKER_FAIL,
  DELETE_WORKER,
  DELETE_WORKER_FAIL,
  GET_COMPANY_BY_ID,
  GET_COMPANY_FAIL,
  GET_INFO_TEAM,
  GET_INFO_TEAM_FAIL
} from "./types";
import axios from "axios";
import { loadUser } from "./auth";
import { config } from "../utilis/config";
import { errorHandler } from "../utilis/errorHandler";

export const addCompany = (
  companyName,
  description,
  address,
  history
) => async dispatch => {
  const body = JSON.stringify({ companyName, description, address });

  try {
    const res = await axios.post("api/company/", body, config);
    dispatch({
      type: ADD_COMPANY,
      payload: res.data
    });
    dispatch(loadUser());
    history.push("/dashboard");
  } catch (err) {
    errorHandler(err, dispatch);

    dispatch({
      type: ADD_COMPANY_FAIL
    });
  }
};

export const getCompanyById = id => async dispatch => {
  try {
    const res = await axios.get(`api/company/${id}`, config);
    dispatch({
      type: GET_COMPANY_BY_ID,
      payload: res.data
    });
  } catch (err) {
    errorHandler(err, dispatch);

    dispatch({
      type: GET_COMPANY_FAIL
    });
  }
};

export const addTeam = (name, description, id) => async dispatch => {
  const body = JSON.stringify({ name, description });
  try {
    const res = await axios.put(`api/teams/${id}`, body, config);

    dispatch({
      type: ADD_TEAM,
      payload: res.data
    });
  } catch (err) {
    errorHandler(err, dispatch);

    dispatch({
      type: ADD_TEAM_FAIL
    });
  }
};
export const getTeamInfo = (company_id, team_id) => async dispatch => {
  //"/info/:company_id/:team_id

  try {
    const res = await axios.get(
      `/api/teams/info/${company_id}/${team_id}`,
      config
    );
    dispatch({
      type: GET_INFO_TEAM,
      payload: res.data
    });
  } catch (err) {
    errorHandler(err, dispatch);

    dispatch({
      type: GET_INFO_TEAM_FAIL
    });
  }
};

//@PUT api/company/add_worker/:company_id/

export const addWorker = (name, email, accessKey, id) => async dispatch => {
  const body = JSON.stringify({ name, email, accessKey });

  try {
    const res = await axios.put(`/api/company/add_worker/${id}`, body, config);
    dispatch({
      type: ADD_WORKER,
      payload: res.data
    });
  } catch (err) {
    errorHandler(err, dispatch);

    dispatch({
      type: ADD_WORKER_FAIL
    });
  }
};

export const deleteWorker = (id, email) => async dispatch => {
  try {
    const res = await axios.put(
      `/api/company/delete_worker/${id}/${email}`,
      config
    );
    dispatch({
      type: DELETE_WORKER,
      payload: res.data
    });
  } catch (err) {
    errorHandler(err, dispatch);

    dispatch({
      type: DELETE_WORKER_FAIL
    });
  }
};

export const addMember = (email, company_id, team_id) => async dispatch => {
  try {
    // "/add_member/:company_id/:team_id",
    const body = JSON.stringify({ email });

    const res = await axios.put(
      `/api/teams/add_member/${company_id}/${team_id}`,
      body,
      config
    );
    dispatch({
      type: ADD_MEMBER,
      payload: res.data
    });
  } catch (err) {
    errorHandler(err, dispatch);

    dispatch({
      type: ADD_MEMBER_FAIL
    });
  }
};

export const deleteMember = (email, company_id, team_id) => async dispatch => {
  const body = JSON.stringify({ email });

  try {
    const res = await axios.put(
      `/api/teams/delete_member/${company_id}/${team_id}`,
      body,
      config
    );
    dispatch({
      type: REMOVE_MEMBER,
      payload: res.data
    });
  } catch (err) {
    errorHandler(err, dispatch);

    dispatch({
      type: REMOVE_MEMBER_FAIL
    });
  }
};

export const connectWithCompany = (
  companyName,
  accessKey
) => async dispatch => {
  const body = JSON.stringify({ companyName, accessKey });

  try {
    const res = await axios.put(`/api/users/connect`, body, config);
    dispatch({
      type: CONNECT_WITH,
      payload: res.data
    });
  } catch (err) {
    errorHandler(err, dispatch);

    dispatch({
      type: CONNECT_WITH_FAIL
    });
  }
};
