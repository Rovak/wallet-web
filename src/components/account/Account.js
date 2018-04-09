import React, {Component} from 'react';
import {connect} from "react-redux";
import {tu} from "../../utils/i18n";
import {loadTokenBalances} from "../../actions/account";
import {BarLoader} from "../common/loaders";
import {passwordToAddress} from "@tronprotocol/wallet-api/src/utils/crypto";
import xhr from "axios";

class Account extends Component {

  constructor() {
    super();

    this.state = {
      waitingForTrx: false,
      trxRequestResponse: {
        success: false,
        code: -1,
        message: '',
      },
    };
  }

  componentDidMount() {
    this.reloadTokens();
  }

  reloadTokens = () => {
    let {account, loadTokenBalances} = this.props;
    loadTokenBalances(passwordToAddress(account.key));
  };

  renderTokens() {

    let {tokenBalances = []} = this.props;

    if (tokenBalances.length === 0) {
      return (
        <div className="text-center d-flex justify-content-center p-4">
          <BarLoader/>
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

  requestTrx = async () => {
    let {account} = this.props;

    this.setState({waitingForTrx: true});

    try {

      let address = passwordToAddress(account.key);

      let {data} = await xhr.post("http://47.74.190.150:8081/request-coins", {
        address,
      });

      this.setState({
        trxRequestResponse: {
          success: data.success,
          code: data.code,
          message: data.message,
        },
      });

      setTimeout(() => this.reloadTokens(), 1500);

    } catch(e) {
      this.setState({
        trxRequestResponse: {
          success: false,
          code: 9,
        },
      })
    }
    finally {
      this.setState({
        waitingForTrx: false
      });
    }
  };

  renderTestnetRequest() {

    let {waitingForTrx, trxRequestResponse} = this.state;

    if (waitingForTrx) {
      return (
        <div className="text-center d-flex justify-content-center p-4">
          <BarLoader/>
        </div>
      );
    }

    if (trxRequestResponse.code !== -1) {
      if (trxRequestResponse.success === true) {
        return (
          <div className="alert alert-success text-success">
            10.000 TRX have been added to your account!
          </div>
        )
      } else {
        return (
          <div className="alert alert-warning text-warning">
            {trxRequestResponse.message}
          </div>
        )
      }
    }


    return (
      <React.Fragment>
        <button className="btn btn-primary" onClick={this.requestTrx}>
          Request TRX for testing
        </button>
        <p className="pt-1">
          When requesting TRX you will receive 10.000 TRX which you can use for testing on the testnet.<br/>
          You may only request TRX once per account.
        </p>
      </React.Fragment>
    );
  }

  render() {

    let {account} = this.props;

    let address = passwordToAddress(account.key);

    return (
      <main className="container pt-3">
        <div className="alert alert-danger text-center">
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
                    <span className="text-danger">
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
        <div className="row mt-3">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header border-bottom-0 text-center">
                {tu("Testnet")}
              </div>
              <div className="card-body text-center">
                {this.renderTestnetRequest()}
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
