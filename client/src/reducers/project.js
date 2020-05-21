import {
  GET_ALL_PROJECTS_OF_TEAM_FAIL,
  GET_ALL_PROJECTS_OF_TEAM,
  GET_PROJECT_ID,
  GET_PROJECT_ID_FAIL,
  ADD_TASK,
  ADD_TASK_FAIL,
  REMOVE_TASK,
  REMOVE_TASK_FAIL,
  ADD_PROJECT
} from "../actions/types";

const initialState = {
  projects: [],
  loading: true,
  project: {
    loading: true,
    item: {}
  }
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_ALL_PROJECTS_OF_TEAM:
    case ADD_PROJECT:
      return {
        ...state,
        projects: payload,
        loading: false
      };
    case GET_PROJECT_ID:
    case ADD_TASK:
    case REMOVE_TASK:
      return {
        ...state,
        project: {
          item: payload,
          loading: false
        }
      };
    case GET_PROJECT_ID_FAIL:
    case ADD_TASK_FAIL:
    case REMOVE_TASK_FAIL:
      return {
        ...state,
        project: {
          item: {},
          loading: true
        }
      };
    case GET_ALL_PROJECTS_OF_TEAM_FAIL:
      return {
        projects: [],
        loading: true
      };
    default:
      return state;
  }
}
