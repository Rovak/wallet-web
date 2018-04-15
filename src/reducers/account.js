import {SET_TOKEN_BALANCES} from "../actions/account";
import {LOGIN} from "../actions/app";

const initialState = {
  tokens: [],
};

export function accountReducer(state = initialState, action) {

  switch (action.type) {

    case LOGIN: {
      return {
        ...state,
        tokens: [],
      };
    }

    case SET_TOKEN_BALANCES: {
      return {
        ...state,
        tokens: action.tokens,
      }
    }

    default:
      return state;
  }
}
