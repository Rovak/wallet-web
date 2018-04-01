import { combineReducers } from "redux";
import {appReducer} from "./app";
import {blockchainReducer} from "./blockchain";
import {networkReducer} from "./network";
import {tokensReducer} from "./tokens";
import {accountReducer} from "./account";

export default combineReducers({
  app: appReducer,
  blockchain: blockchainReducer,
  network: networkReducer,
  tokens: tokensReducer,
  account: accountReducer,
});
