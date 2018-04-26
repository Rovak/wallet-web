import React, {Component} from 'react';
import {connect} from "react-redux";
import {loadBlocks, loadTotalNumberOfTransactions} from "../../actions/blockchain";
import {tu} from "../../utils/i18n";
import {BarLoader} from "../common/loaders";
import {Redirect} from "react-router-dom";
import {Client} from "../../services/api";
import {passwordToAddress} from "@tronprotocol/wallet-api/src/utils/crypto";
import {filter} from "lodash";

class Transactions extends Component {

  componentDidMount() {
    this.props.loadBlocks();
    this.props.loadTotalNumberOfTransactions();
  }

  constructor() {
    super();

    this.state = {};
  }
  
  
  userTransactions(userAddress) {
    let {transactions} = this.props;

    transactions = filter(
      transactions, a =>
        a.from == userAddress || a.to == userAddress);

    return transactions;
  }

  renderTable() {

    let {transactions} = this.props;
    let {account} = this.props;
    //let userAddress = "27iZmccB2mbXK1Gtjwk9DcciL2qU87P3jNF";
    let userAddress = passwordToAddress(account.key);
   
    if (transactions === null) {
      return (
        <div className="text-center d-flex justify-content-center">
          <BarLoader />
        </div>
      );
    }
    
    transactions = this.userTransactions(userAddress);

    if (transactions.length === 0) {
      return (
        <div className="text-center d-flex justify-content-center">
         {tu("No transactions")}
        </div>
      );
    }

    return (

        <table className="table table-striped">
            <thead className="thead-dark">
              <tr>
                <th>{tu("from")}</th>
                <th></th>
                <th>{tu("to")}</th>
                <th className="text-right">{tu("amount")}</th>
              </tr>
            </thead>
            <tbody>

            {transactions.slice(0,200).map(transaction => (
                 
                      <tr>
                        <th>
                        {
                            userAddress == transaction.from
                            ?
                            tu('your_wallet')
                            : 
                            transaction.from
                        }
                        </th>
                        <th><i class='fa fa-arrow-right'/></th>
                        <th>
                        {
                            userAddress == transaction.to
                            ?
                            tu('your_wallet')
                            : 
                            transaction.to
                        }
                        </th>
                        <th className="text-right">{transaction.amount} TRX</th>
                      </tr>

               ))
            }

            </tbody>
        </table>
    );
  }

  render() {

    let {account} = this.props;

    if (!account.isLoggedIn) {
      return <Redirect to="/login" />;
    }


    return (
      <main className="container pt-3">
        <div className="row">
          <div className="col-sm-12">
          <h2 className="text-center">Recent Transactions</h2>
              {this.renderTable()}
          </div>
        </div>
      </main>
    )

  }
}

function mapStateToProps(state) {
  return {
    blocks: state.blockchain.blocks,
    transactions: state.blockchain.transactions,
    totalNumberOfTransactions: state.blockchain.totalNumberOfTransactions,
    activeLanguage: state.app.activeLanguage,
    account: state.app.account
  };
}

const mapDispatchToProps = {
  loadBlocks,
  loadTotalNumberOfTransactions
};

export default connect(mapStateToProps, mapDispatchToProps)(Transactions)
