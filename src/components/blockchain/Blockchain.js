import React, {Component} from 'react';
import {Link} from "react-router-dom";

export default class Blockchain extends Component {

  constructor() {
    super();

    this.state = {
      transactions: [
        {
          from: '4948C2E8A756D9437037D...',
          to: 'B56446E617E924805E4D6CA0...',
          amount: 235113,
        },
        {
          from: '4948C2E8A756D9437037D...',
          to: 'B56446E617E924805E4D6CA0...',
          amount: 91273,
        },
        {
          from: '4948C2E8A756D9437037D...',
          to: 'B56446E617E924805E4D6CA0...',
          amount: 35612,
        },
        {
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
          hash: '4948C2E8A756D9437037DCD8C7E0C73D560CA38D',
        },
        {
          number: 6276,
          transactions: 3,
          size: 132 * 3,
          hash: '4948C2E8A756D9437037DCD8C7E0C73D560CA38D',
        },
        {
          number: 6277,
          transactions: 4,
          size: 132 * 4,
          hash: '4948C2E8A756D9437037DCD8C7E0C73D560CA38D',
        },
        {
          number: 6278,
          transactions: 5,
          size: 132 * 5,
          hash: '4948C2E8A756D9437037DCD8C7E0C73D560CA38D',
        },
      ]
    };
  }

  render() {

    let {blocks, transactions} = this.state;

    return (
      <main role="main" className="container">
        <div className="row">
          <div className="col-md">
            <div className="d-flex align-items-center p-3 my-3 text-white-50 bg-dark rounded box-shadow">
              <i className="fas fa-dollar-sign fa-3x mr-3"/>
              <div className="lh-100 mr-auto">
                <h6 className="mb-0 text-white lh-100">TRX Price</h6>
                <small>$0.04566 7.36%</small>
              </div>
              <i className="fas fa-server fa-3x mr-3"/>
              <div className="lh-100 mr-auto">
                <h6 className="mb-0 text-white lh-100">Representatives</h6>
                <small>5</small>
              </div>
              <i className="fas fa-cube fa-3x mr-3"/>
              <div className="lh-100">
                <h6 className="mb-0 text-white lh-100">Last Block</h6>
                <small>4948C2E8A756D943703...</small>
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
                <small>100,000 total transactions</small>
              </div>
            </div>

            <div className="my-3 p-3 bg-white rounded box-shadow">
              <h6 className="border-bottom border-gray pb-2 mb-0">Recent transactions</h6>
              {
                transactions.map(transaction => (
                  <div className="media text-muted pt-3">
                    <img data-src="holder.js/32x32?theme=thumb&bg=007bff&fg=007bff&size=1" alt="" className="mr-2 rounded"/>
                    <p className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray text-center">
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
                    </p>
                  </div>
                ))
              }
              <small className="d-block text-right mt-3">
                <Link to="/blockchain/transactions">All transactions</Link>
              </small>
            </div>
          </div>
          <div className="col-md">
            <div className="d-flex align-items-center p-3 my-3 text-white-50 bg-secondary rounded box-shadow">
              <i className="fas fa-cubes fa-3x mr-3"/>
              <div className="lh-100">
                <h6 className="mb-0 text-white lh-100">Blocks</h6>
                <small>Current #6275</small>
              </div>
            </div>

            <div className="my-3 p-3 bg-white rounded box-shadow">
              <h6 className="border-bottom border-gray pb-2 mb-0">Recent blocks</h6>
              {
                blocks.map(block => (
                  <div className="media text-muted pt-3">
                    <div className="block mr-3">
                      #{block.number}
                    </div>
                    <p className="media-body pb-3 mb-0 small lh-150 border-bottom border-gray">
                      <strong className="d-block text-gray-dark">Mined by {block.hash}</strong>
                      <div className="row">
                        <div className="col-md">
                          <i className="fas fa-exchange-alt mr-1"/>
                          {block.transactions} transactions
                        </div>
                        <div className="col-md">
                          <i className="fas fa-file mr-1"/>
                          {block.size} bytes
                        </div>
                        <div className="col-md">
                          <i className="fas fa-clock mr-1"/>
                          {12 * block.transactions} seconds ago
                        </div>
                      </div>
                    </p>
                  </div>
                ))
              }
              <small className="d-block text-right mt-3">
                <Link to="/blockchain/blocks">All blocks</Link>
              </small>
            </div>

          </div>
        </div>




      </main>
    )
  }
}


