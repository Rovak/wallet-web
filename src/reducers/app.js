import {SET_ACCOUNTS} from "../actions/app";

const initialState = {
  accounts: [],
};

export function appReducer(state = initialState, action) {

  switch (action.type) {
    case SET_ACCOUNTS: {
      return {
        ...state,
        accounts: action.accounts,
      };
    }
  }

  return state;
}
