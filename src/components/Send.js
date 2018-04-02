/* eslint-disable no-restricted-globals */
import {connect} from "react-redux";
import React from "react";
import * as qs from "query-string";
import {loadTokenBalances} from "../actions/account";
import {tu} from "../utils/i18n";
import {Client} from "../services/api";

class Send extends React.Component {

  constructor(props) {
    super(props);

    let queryParams = qs.parse(props.location.search);

    this.state = {
      to: queryParams.to || "",
      token: "",
      amount: 0,
      sendStatus: 'waiting',
      isLoading: false,
    };
  }

  isValid = () => {
    let {to, token, amount} = this.state;

    return to !== "" && token !== "" && amount > 0;
  };

  send = async () => {
    let {to, token, amount} = this.state;
    let {account} = this.props;

    this.setState({ isLoading: true });

    await Client.send(account.key, token, to, amount);

    this.setState({
      sendStatus: 'success',
      isLoading: false,
    });
  };

  componentDidMount() {
    this.props.loadTokenBalances();
  }

  componentDidUpdate() {
    let {tokenBalances} = this.props;
    let {token} = this.state;

    if (!token && tokenBalances.length > 0) {
      this.setState({
        token: tokenBalances[0].name,
      })
    }
  }

  renderFooter() {

    let {sendStatus, isLoading} = this.state;

    if (sendStatus === 'success') {
      return (
        <div className="alert alert-success text-center">
          {tu("successful_send")}
        </div>
      )
    }

    return (
      <p>
        <button
          type="button"
          disabled={!this.isValid() || isLoading}
          className="btn btn-primary col-md"
          onClick={this.send}>{tu("send")}</button>
      </p>
    )
  }

  render() {

    let {tokenBalances, account} = this.props;
    let {to, token, amount} = this.state;

    if (!account.isLoggedIn) {
      return (
        <div className="alert alert-warning" role="alert">
          {tu("require_account_to_send")}
        </div>
      );
    }

    return (
      <main className="container-fluid pt-5 pb-5 bg-dark">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-sm-8 col-lg-5">
              <div className="card">
                <div className="card-header text-center">
                 {tu("Send TRX")}
                </div>
                <div className="card-body">
                  <form>
                    <div className="form-group">
                      <label>{tu("to")}</label>
                      <div className="input-group mb-3">
                        <input type="text"
                               onChange={(ev) => this.setState({ to: ev.target.value })}
                               className="form-control"
                               value={to} />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>{tu("token")}</label>
                      <div className="input-group mb-3">
                        <select className="form-control" value={token}>
                          {
                            tokenBalances.map(tokenBalance => (
                              <option key={tokenBalance.name} value={tokenBalance.balance}>
                                {tokenBalance.name} ({tokenBalance.balance} available)
                              </option>
                            ))
                          }
                        </select>
                      </div>
                    </div>
                    <div className="form-group">
                      <label>{tu("amount")}</label>
                      <div className="input-group mb-3">
                        <input type="number"
                               onChange={(ev) => this.setState({ amount: ev.target.value })}
                               className="form-control"
                               value={amount} />
                      </div>
                    </div>
                    {this.renderFooter()}
                  </form>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Send)
