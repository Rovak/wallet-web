import {Client} from "../services/api";

export const SET_TRANSACTIONS = 'SET_TRANSACTIONS';
export const SET_BLOCKS = 'SET_BLOCKS';

export const setTransactions = (transactions = []) => ({
  type: SET_TRANSACTIONS,
  transactions,
});

export const setBlocks = (blocks = []) => ({
  type: SET_BLOCKS,
  blocks,
});

export const loadBlocks = () => async (dispatch, getState) => {

  let block = await Client.getLatestBlock();

  let blocks = [];

  for (let i = 0; i < 7; i++) {
    blocks.push(await Client.getBlockByNum(block.number - i));
  }

  console.log("BLOCKS", blocks);

  dispatch(setBlocks(blocks));
};

export const loadTransactions = () => async (dispatch, getState) => {

  let block = await Client.getLatestBlock();

  console.log("BLOCK", block);

  let blocks = [];

  for (let i = 0; i < 7; i++) {
    blocks.push(await Client.getBlockByNum(block.number - i));
  }

  dispatch(setBlocks(blocks));
};
