import {
  GET_INFO_TEAM,
  GET_INFO_TEAM_FAIL,
  ADD_MEMBER,
  REMOVE_MEMBER
} from "../actions/types";

const initialState = {
  team: {},
  loading: true
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_INFO_TEAM:
    case ADD_MEMBER:
    case REMOVE_MEMBER:
      return {
        ...state,
        team: payload,
        loading: false
      };
    case GET_INFO_TEAM_FAIL:
      return {
        team: {},
        loading: true
      };

    default:
      return state;
  }
}
