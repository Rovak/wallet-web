import Lockr from "lockr";

import {LOGIN, LOGOUT, SET_ACCOUNTS, SET_LANGUAGE, SET_PRICE, SEARCH} from "../actions/app";
import {privateKeyToAddress} from "@tronprotocol/wallet-api/src/utils/crypto";


const initialState = {
  accounts: [],
  price: {
    usd: 0,
    percentage: 0,
  },
  availableLanguages: {
    // nl: "Nederlands",
    en: "English",
    // zh: "简体中文",
    fa:"فارسی",
    ko:"한국어",
    br: "Português Brasil",
    fr: "Français",
    es: "Español" ,
  },
  activeLanguage: 'en',
  account: {
    key: undefined,
    address: undefined,
    isLoggedIn: false,
  },
  searchString: '',
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

    case SET_LANGUAGE: {


      let language = action.language;

      if (typeof state.availableLanguages[action.language] === 'undefined') {
        language = 'en';
      }

      Lockr.set("language", language);

      return {
        ...state,
        activeLanguage: language,
      };
    }

    case LOGIN: {

      Lockr.set("account_key", action.password);

      return {
        ...state,
        account: {
          key: action.password,
          isLoggedIn: true,
          address: privateKeyToAddress(action.password),
        }
      };
    }

    case LOGOUT: {
      Lockr.rm("account_key");
      return {
        ...state,
        account: {
          key: undefined,
          isLoggedIn: false,
        }
      }
    }

    case SEARCH: {
      return {
        ...state,
        searchString: action.searchString
      }
    }

    default:
      return state;
  }
}
