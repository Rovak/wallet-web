import {SET_WITNESSES} from "../actions/network";

const initialState = {
  witnesses: [],
};

export function networkReducer(state = initialState, action) {

  switch (action.type) {
    case SET_WITNESSES: {
      return {
        ...state,
        witnesses: action.witnesses,
      };
    }
    default:
      return state;
  }
}
