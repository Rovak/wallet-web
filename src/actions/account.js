import {Client} from "../services/api";

export const SET_TOKEN_BALANCES = 'SET_TOKEN_BALANCES';

export const setTokenBalances = (tokens = []) => ({
  type: SET_TOKEN_BALANCES,
  tokens,
});

export const loadTokenBalances = (password) => async (dispatch) => {
  let balances = await Client.getAccountBalances(password);
  dispatch(setTokenBalances(balances));
};
