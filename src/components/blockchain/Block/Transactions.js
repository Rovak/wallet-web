import React from "react";
import {tu} from "../../../utils/i18n";
import {FormattedNumber} from "react-intl";


export function BlockTransactions({block}) {

  let transactions = block.transactions;

  if (transactions.length === 0) {
    return (
      <div class="text-center p-3">
        {tu("no_transactions")}
      </div>
    );
  }

  return (
    <table className="table table-sm table-hover bg-white m-0 border-top-0">
      <thead>
      <tr>
        <th style={{width: 125 }}>{tu("from")}</th>
        <th style={{width: 125 }}>{tu("to")}</th>
        <th style={{width: 125 }}>{tu("amount")}</th>
      </tr>
      </thead>
      <tbody>
      {
        transactions.map((transaction, index) => (
          <tr key={transaction.index}>
            <td>{transaction.from}</td>
            <td>{transaction.to}</td>
            <td class="text-right text-nowrap">
              <FormattedNumber value={transaction.amount} />&nbsp; TRX
            </td>
          </tr>
        ))
      }
      </tbody>
    </table>
  );
}
