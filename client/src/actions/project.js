import axios from "axios";
import {
  GET_ALL_PROJECTS_OF_TEAM,
  GET_ALL_PROJECTS_OF_TEAM_FAIL,
  GET_PROJECT_ID,
  GET_PROJECT_ID_FAIL,
  ADD_PROJECT,
  ADD_PROJECT_FAIL,
  COMPLETE_TASK,
  COMPLETE_TASK_FAIL,
  ADD_TASK,
  ADD_TASK_FAIL,
  REMOVE_TASK,
  REMOVE_TASK_FAIL,
  ADD_NOTE,
  ADD_NOTE_FAIL,
  GET_NOTES,
  GET_NOTES_FAIL
} from "./types";
import { config } from "../utilis/config";
import { errorHandler } from "../utilis/errorHandler";

//@ROUTE get api/projects/:team_id

export const getAllProjects = id => async dispatch => {
  try {
    const res = await axios.get(`/api/projects/${id}`, config);
    dispatch({
      type: GET_ALL_PROJECTS_OF_TEAM,
      payload: res.data
    });
  } catch (err) {
    errorHandler(err, dispatch);

    dispatch({
      type: GET_ALL_PROJECTS_OF_TEAM_FAIL
    });
  }
};

export const addProject = (projectName, description, id) => async dispatch => {
  const body = JSON.stringify({ projectName, description });
  try {
    const res = await axios.post(
      `http://localhost:3000/api/projects/${id}`,
      body,
      config
    );

    dispatch({
      type: ADD_PROJECT,
      payload: res.data
    });
  } catch (err) {
    errorHandler(err, dispatch);

    dispatch({
      type: ADD_PROJECT_FAIL
    });
  }
};

export const getProjectId = id => async dispatch => {
  try {
    const res = await axios.get(
      `http://localhost:3000/api/projects/info/${id}`,
      config
    );

    dispatch({
      type: GET_PROJECT_ID,
      payload: res.data
    });
  } catch (err) {
    errorHandler(err, dispatch);

    dispatch({
      type: GET_PROJECT_ID_FAIL
    });
  }
};
export const addTask = (
  name,
  description,
  priority,
  assignTo,
  id
) => async dispatch => {
  const body = JSON.stringify({ name, description, priority, assignTo });
  try {
    const res = await axios.post(
      `http://localhost:3000/api/projects/add_task/${id}`,
      body,
      config
    );

    dispatch({
      type: ADD_TASK,
      payload: res.data
    });
  } catch (err) {
    errorHandler(err, dispatch);

    dispatch({
      type: ADD_TASK_FAIL
    });
  }
};

export const deleteTask = (project_id, id) => async dispatch => {
  try {
    const res = await axios.put(
      `http://localhost:3000/api/projects/${project_id}/remove_task/${id}`,
      config
    );

    dispatch({
      type: REMOVE_TASK,
      payload: res.data
    });
  } catch (err) {
    errorHandler(err, dispatch);

    dispatch({
      type: REMOVE_TASK_FAIL
    });
  }
};
export const completeTask = (project_id, task_id) => async dispatch => {
  try {
    const res = await axios.put(
      `http://localhost:3000/api/projects/${project_id}/${task_id}/complete`,
      config
    );

    dispatch({
      type: COMPLETE_TASK,
      payload: res.data
    });
  } catch (err) {
    errorHandler(err, dispatch);

    dispatch({
      type: COMPLETE_TASK_FAIL
    });
  }
};

export const addNote = (
  note,
  company_id,
  project_id,
  task_id,

  userId
) => async dispatch => {
  const body = JSON.stringify({
    note,
    company_id,
    project_id,
    task_id,
    userId
  });

  try {
    const res = await axios.post(
      `http://localhost:3000/api/note`,
      body,
      config
    );

    dispatch({
      type: ADD_NOTE,
      payload: res.data
    });
  } catch (err) {
    errorHandler(err, dispatch);

    dispatch({
      type: ADD_NOTE_FAIL
    });
  }
};

export const getNotesByCompany = id => async dispatch => {
  try {
    const res = await axios.get(
      `http://localhost:3000/api/note/company/${id}`,
      config
    );

    dispatch({
      type: GET_NOTES,
      payload: res.data
    });
  } catch (err) {
    errorHandler(err, dispatch);

    dispatch({
      type: GET_NOTES_FAIL
    });
  }
};

export const getNotesByTask = id => async dispatch => {
  try {
    const res = await axios.get(
      `http://localhost:3000/api/note/task/${id}`,
      config
    );

    dispatch({
      type: GET_NOTES,
      payload: res.data
    });
  } catch (err) {
    errorHandler(err, dispatch);

    dispatch({
      type: GET_NOTES_FAIL
    });
  }
};
