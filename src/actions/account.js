import {Client} from "../services/api";

export const SET_TOKEN_BALANCES = 'SET_TOKEN_BALANCES';
export const SET_BLOCKS = 'SET_BLOCKS';

export const setTokenBalances = (tokens = []) => ({
  type: SET_TOKEN_BALANCES,
  tokens,
});

export const loadTokenBalances = (password) => async (dispatch) => {
  let balances = await Client.getAccountBalances(password);
  dispatch(setTokenBalances(balances));
};

export const setBlocks = (blocks = []) => ({
  type: SET_BLOCKS,
  blocks,
});

export const loadAllBlocks = () => async (dispatch, getState) => {

  let block = await Client.getLatestBlock();

  let blockRequests = [];

  for (let i = 0; i < 100; i++) {
    if ((block.number - i) < 0) {
      break;
    }
    blockRequests.push(Client.getBlockByNum(block.number - i));
  }

  dispatch(setBlocks(await Promise.all(blockRequests)));
};
