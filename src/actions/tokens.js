import {Client} from "../services/api";

export const SET_TOKENS = 'SET_TOKENS';
export const SET_NODES = 'SET_NODES';

export const setTokens = (tokens = []) => ({
  type: SET_TOKENS,
   tokens,
});



export const loadTokens = () => async (dispatch, getState) => {
  let assets = await Client.getAssetIssueList();
  dispatch(setTokens(assets));
};
