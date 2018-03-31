import {LOGIN, SET_ACCOUNTS, SET_LANGUAGE, SET_PRICE} from "../actions/app";

const initialState = {
  accounts: [],
  price: {
    usd: 0,
    percentage: 0,
  },
  availableLanguages: {
    nl: "Nederlands",
    en: "English",
  },
  activeLanguage: navigator.language.split(/[-_]/)[0],
  account: {
    isLoggedIn: false,
  },
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
      return {
        ...state,
        activeLanguage: action.language,
      };
    }

    case LOGIN: {
      return {
        ...state,
        account: {
          isLoggedIn: true,
        }
      };
    }

    default:
      return state;
  }
}
