import {SET_TOKEN_BALANCES} from "../actions/account";
import {LOGIN} from "../actions/app";
import {find} from "lodash";

const initialState = {
  tokens: [],
  trxBalance: 0,
  frozen: {
    total: 0,
    balances: [],
  },
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

      let {balance: trxBalance = 0} = find(action.tokens, tb => tb.name.toUpperCase() === "TRX") || {};

      return {
        ...state,
        tokens: action.tokens,
        trxBalance,
        frozen: {
          ...action.frozen,
        }
      }
    }

    default:
      return state;
  }
}
