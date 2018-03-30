import {SET_BLOCKS} from "../actions/blockchain";
import * as _ from "lodash";


const initialState = {
  transactions: null,
  blocks: [],
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
  }

  return state;
}
