import {Client} from "../services/api";

export const SET_ACCOUNTS = 'SET_ACCOUNTS';

export const setAccounts = (accounts = []) => ({
  type: SET_ACCOUNTS,
  accounts,
});


export const loadAccounts = () => async (dispatch, getState) => {
  let accounts = await Client.getAccountList();
  dispatch(setAccounts(accounts));
};
