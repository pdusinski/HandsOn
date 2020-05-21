import {
  ADD_COMPANY,
  ADD_COMPANY_FAIL,
  ADD_TEAM,
  ADD_WORKER,
  DELETE_WORKER,
  GET_COMPANY_FAIL,
  GET_COMPANY_BY_ID
} from "../actions/types";

const initialState = {
  company: {},
  loading: true
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_COMPANY:
    case GET_COMPANY_BY_ID:
    case ADD_TEAM:
    case ADD_WORKER:
    case DELETE_WORKER:
      return {
        ...state,
        company: payload,
        loading: false
      };
    case ADD_COMPANY_FAIL:
    case GET_COMPANY_FAIL:
      return {
        ...state,
        company: {},
        loading: true
      };
    default:
      return {
        ...state
      };
  }
}
