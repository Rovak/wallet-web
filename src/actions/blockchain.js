import {Client} from "../services/api";

export const SET_TRANSACTIONS = 'SET_TRANSACTIONS';
export const SET_TOTAL_TRANSACTIONS = 'SET_TOTAL_TRANSACTIONS';
export const SET_BLOCKS = 'SET_BLOCKS';

export const setTransactions = (transactions = []) => ({
  type: SET_TRANSACTIONS,
  transactions,
});

export const setTotalNumberOfTransactions = (numberOfTransactions = 0) => ({
  type: SET_TOTAL_TRANSACTIONS,
  numberOfTransactions,
});

export const setBlocks = (blocks = []) => ({
  type: SET_BLOCKS,
  blocks,
});

export const loadBlocks = () => async (dispatch, getState) => {

  let block = await Client.getLatestBlock();

  let blockRequests = [];

  for (let i = 0; i < 7; i++) {
    if ((block.number - i) < 0) {
      break;
    }
    blockRequests.push(Client.getBlockByNum(block.number - i));
  }

  dispatch(setBlocks(await Promise.all(blockRequests)));
};

export const loadTotalNumberOfTransactions = () => async (dispatch, getState) => {

  let totalTransactions = await Client.getTotalNumberOfTransactions();
  dispatch(setTotalNumberOfTransactions(totalTransactions));
};
