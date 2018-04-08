import React, {Component} from 'react';
import {connect} from "react-redux";
import {tu} from "../../utils/i18n";
import {loadTokenBalances} from "../../actions/account";
import {BarLoader} from "../common/loaders";
import {passwordToAddress} from "@tronprotocol/wallet-api/src/utils/crypto";

class Account extends Component {

  componentDidMount() {
    let {account, loadTokenBalances} = this.props;
    loadTokenBalances(passwordToAddress(account.key));
  }

  renderTokens() {

    let {tokenBalances = []} = this.props;

    if (tokenBalances.length === 0) {
      return (
        <div className="text-center d-flex justify-content-center p-4">
          <BarLoader />
        </div>
      );
    }

    return (
      <table className="table border-0">
        <thead>
        <tr>
          <th>{tu("name")}</th>
          <th>{tu("balance")}</th>
        </tr>
        </thead>
        <tbody>
        {
          tokenBalances.map((token) => (
            <tr key={token.name}>
              <td>{token.name}</td>
              <td>{token.balance}</td>
            </tr>
          ))
        }
        </tbody>
      </table>
    )
  }

  render() {

    let {account} = this.props;

    let address = passwordToAddress(account.key);

    return (
      <main className="container pt-3">
        <div class="alert alert-danger text-center">
            {tu("do_not_send_1")}
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header text-center">
                {tu("account")}
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-2">
                    <b>{tu("address")}</b>
                  </div>
                  <div className="col-md-10">
                    {address}<br/>
                    <span class="text-danger">
                      ({tu("do_not_send_2")})
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header border-bottom-0 text-center">
                {tu("tokens")}
              </div>
              <div className="card-body p-0 border-0">
                {this.renderTokens()}
              </div>
            </div>
          </div>
        </div>
      </main>
    )
  }
}


function mapStateToProps(state) {
  return {
    account: state.app.account,
    tokenBalances: state.account.tokens,
  };
}

const mapDispatchToProps = {
  loadTokenBalances,
};

export default connect(mapStateToProps, mapDispatchToProps)(Account)

