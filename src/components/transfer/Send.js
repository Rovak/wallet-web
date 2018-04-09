/* eslint-disable no-restricted-globals */
import {connect} from "react-redux";
import React from "react";
import * as qs from "query-string";
import {loadTokenBalances} from "../../actions/account";
import {tu} from "../../utils/i18n";
import {Client} from "../../services/api";
import {Link} from "react-router-dom";
import {passwordToAddress} from "@tronprotocol/wallet-api/src/utils/crypto";
import SendOption from "./SendOption";
import {isAddressValid} from "@tronprotocol/wallet-api/src/utils/address";
import {find} from "lodash";

class Send extends React.Component {

  constructor(props) {
    super(props);

    let queryParams = qs.parse(props.location.search);

    this.state = {
      to: queryParams.to || "",
      token: "",
      amount: '',
      sendStatus: 'waiting',
      isLoading: false,
    };
  }

  /**
   * Check if the form is valid
   * @returns {*|boolean}
   */
  isValid = () => {
    let {to, token, amount} = this.state;

    return isAddressValid(to) && token !== "" && this.getSelectedTokenBalance() >= amount;
  };

  /**
   * Send the transaction
   */
  send = async () => {
    let {to, token, amount} = this.state;
    let {account} = this.props;

    this.setState({ isLoading: true });

    await Client.send(account.key, token, to, amount * 1000000);

    this.setState({
      sendStatus: 'success',
      isLoading: false,
    });
  };

  setAmount = (amount) => {

    if (amount !== '') {
      amount = parseFloat(amount);
    }

    this.setState({
      amount: amount > 0 ? amount : '',
    });
  };

  getSelectedTokenBalance = () => {
    let {tokenBalances} = this.props;
    let {token} = this.state;

    if (token) {
      return parseFloat(find(tokenBalances, t => t.name === token).balance);
    }

    return 0;
  };

  isAmountValid = () => {
    let {amount} = this.state;
    let selectedTokenBalance = this.getSelectedTokenBalance();
    return amount === 0 || amount === '' || selectedTokenBalance >= amount;
  };


  componentDidMount() {
    let {account} = this.props;
    if (account.isLoggedIn) {
      this.props.loadTokenBalances(passwordToAddress(account.key));
    }
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

    let isToValid = to.length === 0 || isAddressValid(to);
    let isAmountValid = this.isAmountValid();

    if (!account.isLoggedIn) {
      return (
        <div>
          <div className="alert alert-warning">
            {tu("require_account_to_send")}
          </div>
          <p className="text-center">
            <Link to="/login">{tu("Go to login")}</Link>
          </p>
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
                               className={"form-control " + (!isToValid ? "is-invalid" : "")}
                               value={to} />
                          <div className="invalid-feedback">
                            {tu("invalid_address")}
                          </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <label>{tu("token")}</label>
                      <div className="input-group mb-3">
                        <select
                          className="form-control"
                          value={token}>
                          {
                            tokenBalances.map(tokenBalance => (
                              <SendOption key={tokenBalance.name} name={tokenBalance.name} balance={tokenBalance.balance}/>
                            ))
                          }
                        </select>
                      </div>
                    </div>
                    <div className="form-group">
                      <label>{tu("amount")}</label>
                      <div className="input-group mb-3">
                        <input type="number"
                               onChange={(ev) => this.setAmount(ev.target.value) }
                               className={"form-control " + (!isAmountValid ? "is-invalid" : "")}
                               value={amount} />
                        <div className="invalid-feedback">
                          {tu("insufficient_tokens")}
                        </div>
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
