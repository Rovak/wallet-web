import {Client} from "../services/api";
import xhr from "axios";

export const SET_ACCOUNTS = 'SET_ACCOUNTS';
export const SET_PRICE = 'SET_PRICE';
export const SET_LANGUAGE = 'SET_LANGUAGE';

export const setLanguage = (language = 'en') => ({
  type: SET_LANGUAGE,
  language,
});

export const setAccounts = (accounts = []) => ({
  type: SET_ACCOUNTS,
  accounts,
});

export const setPrice = (price, percentage) => ({
  type: SET_PRICE,
  price: parseFloat(price),
  percentage: parseFloat(percentage),
});


export const loadAccounts = () => async (dispatch, getState) => {
  let accounts = await Client.getAccountList();
  dispatch(setAccounts(accounts));
};

export const loadPrice = () => async (dispatch, getState) => {

  let {data} = await xhr.get(`https://api.coinmarketcap.com/v1/ticker/tronix/`);


  dispatch(setPrice(data[0].price_usd, data[0].percent_change_24h));
};
