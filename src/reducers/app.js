import {SET_ACCOUNTS, SET_PRICE} from "../actions/app";

const initialState = {
  accounts: [],
  price: {
    usd: 0,
    percentage: 0,
  }
};

export function appReducer(state = initialState, action) {

  switch (action.type) {
    case SET_ACCOUNTS: {
      return {
        ...state,
        accounts: action.accounts,
      };
    }

    case SET_PRICE: {
      return {
        ...state,
        price: {
          usd: action.price,
          percentage: action.percentage,
        }
      }
    }
  }

  return state;
}
