import {SET_TOKEN_BALANCES} from "../actions/account";

const initialState = {
  tokens: [],
};

export function accountReducer(state = initialState, action) {

  switch (action.type) {

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
