import {
  ADD_NOTE,
  GET_NOTES,
  GET_NOTES_FAIL,
  ADD_NOTE_FAIL
} from "../actions/types";

const initialState = {
  notes: [],
  loading: true
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_NOTES:
    case ADD_NOTE:
      return {
        ...state,
        notes: payload,
        loading: false
      };
    case ADD_NOTE_FAIL:
    case GET_NOTES_FAIL:
      return {
        notes: [],
        loading: true
      };

    default:
      return state;
  }
}
