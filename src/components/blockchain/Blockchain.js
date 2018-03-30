import React, {Component, Fragment} from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {loadBlocks} from "../../actions/blockchain";
import TimeAgo from 'react-timeago'
import {BarLoader} from "react-spinners";
import {loadPrice} from "../../actions/app";

class Blockchain extends Component {


  componentDidMount() {
    this.props.loadBlocks();
    this.props.loadPrice();
  }

  constructor() {
    super();

    this.state = {
      transactions: [
        {
          hash: "asfasdf",
          from: '4948C2E8A756D9437037D...',
          to: 'B56446E617E924805E4D6CA0...',
          amount: 235113,
        },
        {
          hash: "asfasdf324432",
          from: '4948C2E8A756D9437037D...',
          to: 'B56446E617E924805E4D6CA0...',
          amount: 91273,
        },
        {
          hash: "asfasdfkj3j4jk23",
          from: '4948C2E8A756D9437037D...',
          to: 'B56446E617E924805E4D6CA0...',
          amount: 35612,
        },
        {
          hash: "asfasdlnkl234hj324hkjf",
          from: '4948C2E8A756D9437037D...',
          to: 'B56446E617E924805E4D6CA0...',
          amount: 721628,
        },
      ],
      blocks: [
        {
          number: 6274,
          transactions: 1,
          size: 132,
          hash: '4948C2E8A756D9437037DCD8C7E0C73D560CA38D',
        },
        {
          number: 6275,
          transactions: 2,
          size: 132 * 2,
          hash: '4948C2E8A756D9437037DCD8C7E0C73DSDAF0CA38D',
        },
        {
          number: 6276,
          transactions: 3,
          size: 132 * 3,
          hash: '4948C2E8A756D94ASDFASDFCD8C7E0C73D560CA38D',
        },
        {
          number: 6277,
          transactions: 4,
          size: 132 * 4,
          hash: '4948ASFDADSF756D9437037DCD8C7E0C73D560CA38D',
        },
        {
          number: 6278,
          transactions: 5,
          size: 132 * 5,
          hash: '4948C2EASDFDAD9437037DCD8C7E0C73D560CA38D',
        },
      ]
    };
  }

  renderBlocks() {

    let {blocks} = this.props;

    if (blocks.length === 0) {
      return (
        <div className="text-center d-flex justify-content-center">
          <BarLoader color={'#343a40'} loading={true} height={5} width={150} />
        </div>
      );
    }

    return (
      <Fragment>
        <h6 className="border-bottom border-gray pb-2 mb-0">Recent blocks</h6>
        {
          blocks.map(block => (
            <div key={block.number} className="media text-muted pt-3">
              <div className="block mr-3">
                #{block.number}
              </div>
              <div className="media-body pb-3 mb-0 small lh-150 border-bottom border-gray">
                <strong className="d-block text-gray-dark">Mined by {block.witnessAddress.substr(0, 28)}...</strong>
                <div className="row">
                  <div className="col-md">
                    <i className="fas fa-exchange-alt mr-1"/>
                    {block.transactionsCount} transactions
                  </div>
                  <div className="col-md">
                    <i className="fas fa-file mr-1"/>
                    {block.size} bytes
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
        <small className="d-block text-right mt-3">
          <Link to="/blockchain/blocks">All blocks</Link>
        </small>
      </Fragment>
    )
  }

  renderTransactions() {

    let {transactions} = this.props;

    if (transactions === null) {
      return (
        <div className="text-center d-flex justify-content-center">
          <BarLoader color={'#343a40'} loading={true} height={5} width={150} />
        </div>
      );
    }

    if (transactions.length === 0) {
      return (
        <div className="text-center d-flex justify-content-center">
          No transactions
        </div>
      );
    }

    return (
      <Fragment>
        <h6 className="border-bottom border-gray pb-2 mb-0">Recent transactions</h6>
        {
          transactions.slice(0, 7).map(transaction => (
            <div className="media text-muted pt-3">
              <img data-src="holder.js/32x32?theme=thumb&bg=007bff&fg=007bff&size=1" alt="" className="mr-2 rounded"/>
              <div className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray text-center">
                {transaction.from}
                <i className="fas fa-arrow-right mr-3 ml-3"/>
                {transaction.to}
                <br />
                <br />
                <div className="row">
                  <div className="col-md">
                    <i className="fas fa-hashtag mr-1"/>
                    0x767301954e1a016...
                  </div>
                  <div className="col-md">
                    <i className="fas fa-exchange-alt mr-1"/>
                    {transaction.amount} TRX
                  </div>
                  <div className="col-md">
                    <i className="fas fa-clock mr-1"/>
                    10 seconds ago
                  </div>
                </div>
              </div>
            </div>
          ))
        }
        <small className="d-block text-right mt-3">
          <Link to="/blockchain/transactions">All transactions</Link>
        </small>
      </Fragment>
    )
  }

  render() {

    let {blocks, transactions, price} = this.props;

    return (
      <main role="main" className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="p-3 my-3 text-white-50 bg-dark rounded box-shadow row no-gutters">
              <div className="col-md-3 d-flex align-items-center mb-3 mb-md-0">
                <i className="fas fa-dollar-sign fa-3x mr-3" style={{width: 50}}/>
                <div className="lh-100">
                  <h6 className="mb-0 text-white lh-100">TRX Price</h6>
                  <small>${price.usd} <span className={price.percentage > 0 ? "text-success" : "text-danger"}>{price.percentage}%</span></small>
                </div>
              </div>
              <div className="col-md-3 ml-md-auto d-flex align-items-center mb-3 mb-md-0">
                <i className="fas fa-server fa-3x mr-3" style={{width: 50}}/>
                <div className="lh-100">
                  <h6 className="mb-0 text-white lh-100">Representatives</h6>
                  <small>5</small>
                </div>
              </div>
              <div className="col-md-3 ml-md-auto d-flex align-items-center">
                <i className="fas fa-cube fa-3x mr-3" style={{width: 50}}/>
                <div className="lh-100">
                  <h6 className="mb-0 text-white lh-100">Last Block</h6>
                  <small>4948C2E8A756D943703...</small>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md">
            <div className="d-flex align-items-center p-3 my-3 text-white-50 bg-secondary rounded box-shadow">
              <i className="fas fa-exchange-alt fa-3x mr-3"/>
              <div className="lh-100">
                <h6 className="mb-0 text-white lh-100">Transactions</h6>
                <small>{ (transactions && transactions.length) || 0 } transactions</small>
              </div>
            </div>

            <div className="my-3 p-3 bg-white rounded box-shadow">
              {this.renderTransactions()}
            </div>
          </div>
          <div className="col-md">
            <div className="d-flex align-items-center p-3 my-3 text-white-50 bg-secondary rounded box-shadow">
              <i className="fas fa-cubes fa-3x mr-3"/>
              <div className="lh-100">
                <h6 className="mb-0 text-white lh-100">Blocks</h6>
                { blocks[0] && <small>Current #{blocks[0].number}</small> }
              </div>
            </div>

            <div className="my-3 p-3 bg-white rounded box-shadow">
              {this.renderBlocks()}
            </div>

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
  };
}

const mapDispatchToProps = {
  loadBlocks,
  loadPrice,
};

export default connect(mapStateToProps, mapDispatchToProps)(Blockchain)
