import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {loadBlocks, loadTotalNumberOfTransactions} from "../../actions/blockchain";
import TimeAgo from 'react-timeago'
import {loadPrice} from "../../actions/app";
import {t, tu} from "../../utils/i18n";
import {loadWitnesses} from "../../actions/network";
import {BarLoader} from "../common/loaders";
import {FormattedNumber} from "react-intl";
import {Col, Row} from "reactstrap";

class Blockchain extends Component {

  componentDidMount() {
    this.props.loadBlocks();
    this.props.loadPrice();
    this.props.loadTotalNumberOfTransactions();
    this.props.loadWitnesses();
  }

  constructor() {
    super();

    this.state = {};
  }

  renderBlocks() {

    let {blocks} = this.props;

    if (blocks.length === 0) {
      return (
        <div className="text-center d-flex justify-content-center">
          <BarLoader />
        </div>
      );
    }

    return (
      <Fragment>
        {
          blocks.map(block => (
            <div key={block.number} className="media text-muted pb-1">
              <div className="block mr-3">
                #{block.number}
              </div>
              <div className="media-body pb-3 mb-0 small lh-150 border-bottom border-gray">
                <strong className="d-block text-gray-dark break-word">
                  {tu("Produced by")} {block.witnessAddress.substr(0, 28)}...
                </strong>
                <div className="row">
                  <div className="col-md">
                    <i className="fas fa-exchange-alt mr-1"/>
                    <FormattedNumber value={block.transactionsCount} />
                  </div>
                  <div className="col-md">
                    <i className="fas fa-file mr-1"/>
                    {block.size} {tu("bytes")}
                  </div>
                  <div className="col-md">
                    <i className="fas fa-clock mr-1"/>
                    <TimeAgo date={block.time} />
                  </div>
                </div>
              </div>
            </div>
          ))
        }
      </Fragment>
    )
  }

  renderTransactions() {

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
      <Fragment>
        {
          transactions.slice(0, 7).map(transaction => (
            <div className="media text-muted pt-3">
              <img data-src="holder.js/32x32?theme=thumb&bg=007bff&fg=007bff&size=1" alt="" className="mr-2 rounded"/>
              <div className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray text-center">
                {transaction.from.substr(0, 16)}...
                <i className="fas fa-arrow-right mr-3 ml-3"/>
                {transaction.to.substr(0, 16)}...
                <br />
                <br />
                <div className="row">
                  <div className="col-md">
                    <i className="fas fa-exchange-alt mr-1"/>
                    {transaction.amount} TRX
                  </div>
                </div>
              </div>
            </div>
          ))
        }
      </Fragment>
    )
  }

  render() {

    let {blocks, price, witnesses} = this.props;

    return (
      <main role="main" className="container">
        <Row>
          <div className="col-md-12">
            <div className="p-3 my-3 text-white-50 bg-dark rounded box-shadow row no-gutters">
              <div className="col-md-3 d-flex align-items-center mb-3 mb-md-0">
                <i className="fas fa-dollar-sign fa-3x mr-3" style={{width: 50}}/>
                <div className="lh-100">
                  <h6 className="mb-0 text-white lh-100">TRX {tu("money.price")}</h6>
                  <small>${price.usd} <span className={price.percentage > 0 ? "text-success" : "text-danger"}>{price.percentage}%</span></small>
                </div>
              </div>
              <div className="col-md-3 ml-md-auto d-flex align-items-center mb-3 mb-md-0">
                <i className="fas fa-server fa-3x mr-3" style={{width: 50}}/>
                <div className="lh-100">
                  <h6 className="mb-0 text-white lh-100">{tu("representatives")}</h6>
                  <small>{witnesses.length}</small>
                </div>
              </div>
              <div className="col-md-3 ml-md-auto d-flex align-items-center">
                <i className="fas fa-cube fa-3x mr-3" style={{width: 50}}/>
                <div className="lh-100">
                  <h6 className="mb-0 text-white lh-100">{tu("last_block")}</h6>
                  <small>{blocks[0] && blocks[0].parentHash.substr(0, 16)}...</small>
                </div>
              </div>
            </div>
          </div>
        </Row>
        <Row>
          <Col>
            <div class="card border-light mb-3">
              <div class="card-header">
                <i className="fas fa-exchange-alt mr-1"/>
                {tu("recent_transactions")}
              </div>
              <div class="card-body">
                {this.renderTransactions()}
              </div>
            </div>
          </Col>
          <Col>
            <div class="card border-light mb-3">
              <div class="card-header">
                <i className="fas fa-cubes mr-1"/>
                {tu("Recent blocks")}
              </div>
              <div class="card-body">
                {this.renderBlocks()}
              </div>
            </div>
          </Col>
        </Row>
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
  };
}

const mapDispatchToProps = {
  loadBlocks,
  loadPrice,
  loadTotalNumberOfTransactions,
  loadWitnesses,
};

export default connect(mapStateToProps, mapDispatchToProps)(Blockchain)
