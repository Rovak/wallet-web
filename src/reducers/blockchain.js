import {SET_BLOCKS, SET_TOTAL_TRANSACTIONS} from "../actions/blockchain";
import * as _ from "lodash";


const initialState = {
  transactions: null,
  blocks: [],
  totalNumberOfTransactions: 0,
};

export function blockchainReducer(state = initialState, action) {

  switch(action.type) {
    case SET_BLOCKS: {

      // Read transactions from blocks

      let transactions = _(action.blocks)
        .map(block => block.transactions)
        .flatten()
        .value();

      return {
        ...state,
        blocks: action.blocks,
        transactions,
      }
    }

    case SET_TOTAL_TRANSACTIONS: {
      return {
        ...state,
        totalNumberOfTransactions: action.numberOfTransactions,
      }
    }

    default:
      return state;
  }
}
