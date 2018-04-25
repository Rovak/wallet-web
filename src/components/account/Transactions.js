import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {loadBlocks, loadTotalNumberOfTransactions} from "../../actions/blockchain";
import {loadPrice} from "../../actions/app";
import {t, tu, tv} from "../../utils/i18n";
import {loadWitnesses} from "../../actions/network";
import {BarLoader} from "../common/loaders";
import {FormattedNumber} from "react-intl";
import TimeAgoI18N from "../common/TimeAgoI18N";
import {Link} from "react-router-dom";

class Transactions extends Component {

  componentDidMount() {
    this.props.loadBlocks();
    this.props.loadPrice();
    this.props.loadTotalNumberOfTransactions();
  }

  constructor() {
    super();

    this.state = {};
  }

  renderBlocks() {
    let {blocks, activeLanguage} = this.props;
    
   
  }

  renderTable() {

    let {transactions} = this.props;

    if (transactions === null) {
      return (
        <div className="text-center d-flex justify-content-center">
          <BarLoader />
        </div>
      );
    }

    if (transactions.length === 0) {
      return (
        <div className="text-center d-flex justify-content-center">
         {t("No transactions")}
        </div>
      );
    }

    return (
            
        <table className="table table-striped">
            <thead className="thead-dark">
              <tr>
                <th>{tu("from")}</th>
                <th>{tu("to")}</th>
                <th className="text-right">{tu("amount")}</th>
                <th>{tu("start_end_time")}</th>
                <th>&nbsp;</th>
              </tr>
            </thead>
            <tbody>
            {
              transactions.slice(0, 20).map((transaction, i) => (
                <tr>
                  <th>{transaction.from}</th>
                  <th>{transaction.to}</th>
                  <th className="text-right">{transaction.amount} TRX</th>
                  <th>{tu("start_end_time")}</th>
                  <th>&nbsp;</th>
                </tr>
               ))  
            }
            </tbody>
        </table>
    ); 
  }

  render() {
    
    return (
      <main className="container pt-3">
        <div className="row">
          <div className="col-sm-12">
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
    price: state.app.price,
    totalNumberOfTransactions: state.blockchain.totalNumberOfTransactions,
    witnesses: state.network.witnesses,
    activeLanguage: state.app.activeLanguage,
  };
}

const mapDispatchToProps = {
  loadBlocks,  
  loadPrice,
  loadTotalNumberOfTransactions
};

export default connect(mapStateToProps, mapDispatchToProps)(Transactions)
