import React, {Component} from 'react';

import TronLogo from "../../images/trans_tron_logo.png";
import {genPriKey, getAddressFromPriKey} from "../../lib/crypto/crypto";
import {base64DecodeFromString, base64EncodeToString, byteArray2hexStr} from "../../lib/crypto/code";
import {loginWithPassword} from "../../actions/app";
import {connect} from "react-redux";
import {tu} from "../../utils/i18n";
import {CopyToClipboard} from "react-copy-to-clipboard";
import {sumBy} from "lodash";
import {BarLoader} from "react-spinners";
import {loadTokenBalances} from "../../actions/account";
import {passwordToAddress} from "../../utils/crypto";

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
          <BarLoader color={'#343a40'} loading={true} height={5} width={150}/>
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
            {tu("Do not send1")}
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
                      ({tu("Do not send2")})
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

