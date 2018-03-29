import React, { Component } from 'react';
import * as _ from "lodash";

function createRandomString(length) {
  let chars = "abcdefghijklmnopqrstufwxyzABCDEFGHIJKLMNOPQRSTUFWXYZ1234567890"
  let pwd = _.sampleSize(chars, length || 12);
  return pwd.join("");
}

export default class Accounts extends Component {

  constructor() {
    super();

    let accounts = [];

    let max = 1000000000000;

    for (let i = 1; i < 100; i++) {
      accounts.push({
        rank: i,
        hash: createRandomString(32),
        amount: max - ( i * 78623442368 ),
      });
    }

    this.state = {
      accounts,
    }
  }

  render() {

    let {accounts} = this.state;

    return (
      <main role="main" className="container">
        <div className="row">
          <div className="col-md">
            <div className="d-flex align-items-center p-3 my-3 text-white-50 bg-dark rounded box-shadow">
              <i className="fas fa-piggy-bank fa-3x mr-3"/>
              <div className="lh-100 mr-auto">
                <h6 className="mb-0 text-white lh-100">Accounts</h6>
                <small>100</small>
              </div>
              <i className="fas fa-trophy fa-3x mr-3"/>
              <div className="lh-100 mr-auto">
                <h6 className="mb-0 text-white lh-100">Most TRX</h6>
                <small>{accounts[0].amount} TRX</small>
              </div>
              <i className="fas fa-hashtag fa-3x mr-3"/>
              <div className="lh-100">
                <h6 className="mb-0 text-white lh-100">Newest Account</h6>
                <small>4948C2E8A756D943703...</small>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="my-3 p-3 bg-white rounded box-shadow">
              {
                accounts.map(account => (
                  <div className="media text-muted pt-3">
                    <div className="block mr-3">
                      #{account.rank}
                    </div>
                    <p className="media-body pb-3 mb-0 small lh-150 border-bottom border-gray" style={{ fontSize: '18px'}}>
                      <div className="row">
                        <div className="ml-3 mr-auto">
                          {account.hash.toUpperCase()}
                        </div>
                        <div class="mr-3">
                          {account.amount} TRX
                        </div>
                      </div>
                    </p>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </main>
    )
  }
}


