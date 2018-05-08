import React, {Component} from 'react';
import {connect} from "react-redux";
import {loadAllBlocks} from "../../actions/account";
import {tu} from "../../utils/i18n";
import {BarLoader} from "../common/loaders";
import {Redirect} from "react-router-dom";
import {filter} from "lodash";
import {FormattedNumber} from "react-intl";

class Transactions extends Component {

  componentDidMount() {
    this.props.loadAllBlocks();
  }

  constructor() {
    super();

    this.state = {};
  }


  userTransactions(userAddress) {
    let {transactions} = this.props;

    transactions = filter(
      transactions, a =>
        a.from === userAddress || a.to === userAddress);

    return transactions;
  }


  totalTransactions(){
    let {blocks} = this.props;

    return (
        <small className="text-center justify-content-center">
            {tu("searching_latest")} {blocks.length} {tu("blocks")}
        </small>
    );

  }



  renderTable() {

    let {transactions} = this.props;
    let {account} = this.props;
    //let userAddress = "27d3byPxZXKQWfXX7sJvemJJuv5M65F3vjS";
    let userAddress = account.address;

    if (transactions === null) {
      return (
        <div className="text-center d-flex justify-content-center">
          <BarLoader />
        </div>
      );
    }

    let userTrans = this.userTransactions(userAddress);

    if (userTrans.length === 0) {
      return (
        <div className="alert alert-info text-center">
         {tu("no_transactions_found")}
        </div>
      );
    }

    return (

        <div>
        <table className="table table-sm table-hover bg-white m-0 border-top-0">
            <thead className="thead-dark">
              <tr>
                <th>{tu("from")}</th>
                <th></th>
                <th>{tu("to")}</th>
                <th className="text-right">{tu("amount")}</th>
              </tr>
            </thead>
            <tbody>

            {userTrans.slice(0,100).map((transaction, i) => (

                      <tr key={i}>
                        <td>
                        {
                            userAddress === transaction.from
                            ?
                            tu('your_wallet')
                            :
                            transaction.from
                        }
                        </td>
                        <td><i className='fa fa-arrow-right'/></td>
                        <td>
                        {
                            userAddress === transaction.to
                            ?
                            tu('your_wallet')
                            :
                            transaction.to
                        }
                        </td>
                        <td className="text-right"><FormattedNumber value={transaction.amount} />TRX</td>
                      </tr>

               ))
            }

            </tbody>
        </table>
        {
            userTrans.length > 0 &&
            <div className="text-center p-3">
              {userTrans.length} {tu("transactions_found")}
            </div>
        }
        </div>
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
              <div className="text-center center-block p-2">
                {this.totalTransactions()}
              </div>
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
    activeLanguage: state.app.activeLanguage,
    account: state.app.account
  };
}

const mapDispatchToProps = {
  loadAllBlocks
};

export default connect(mapStateToProps, mapDispatchToProps)(Transactions)
