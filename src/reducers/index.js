import { combineReducers } from "redux";
import {appReducer} from "./app";
import {blockchainReducer} from "./blockchain";

export default combineReducers({
  app: appReducer,
  blockchain: blockchainReducer,
});
