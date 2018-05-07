/* eslint-disable no-restricted-globals */
import {connect} from "react-redux";
import React, {Fragment} from "react";
import * as qs from "query-string";
import {loadTokenBalances} from "../../actions/account";
import {tu} from "../../utils/i18n";
import {Client} from "../../services/api";
import {Redirect} from "react-router-dom";
import {isAddressValid} from "@tronprotocol/wallet-api/src/utils/crypto";
import SendOption from "./SendOption";
import {find} from "lodash";
import {ONE_TRX} from "../../constants";

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

  isAddress = (address) => {
      try {
          return isAddressValid(address);
      } catch (e) {
          return false;
      }
  };

  /**
   * Check if the form is valid
   * @returns {*|boolean}
   */
  isValid = () => {
    let {to, token, amount} = this.state;
    const {account} = this.props ;
    let address = account.address;

    return this.isAddress(to) && token !== "" && this.getSelectedTokenBalance() >= amount && amount > 0 && to !== address;
  };

  /**
   * Send the transaction
   */
  send = async () => {
    let {to, token, amount} = this.state;
    let {account} = this.props;

    this.setState({ isLoading: true });

    await Client.send(account.key, token, to, amount * ONE_TRX);

    this.refreshTokenBalances();

    this.setState({
      sendStatus: 'success',
      isLoading: false,
    });
  };

  setAmount = (amount) => {
    // 20180417 fbsobreira: allow send values smaller than 0 (FIX issue #91)
    /*
    if (amount !== '') {
      amount = parseFloat(amount);
    }

    this.setState({
      amount: amount > 0 ? amount : '',
    });
    */
    amount = amount.replace(/^0+(?!\.|$)/, '').replace(/[^0-9 .]+/g,'').replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1");

    this.setState({
      amount: amount,
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
    this.refreshTokenBalances();
  }

  refreshTokenBalances = () => {
    let {account} = this.props;
    if (account.isLoggedIn) {
      this.props.loadTokenBalances(account.address);
    }
  };

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
      <Fragment>
        <div className="alert alert-warning">
          {tu("address_warning")}
        </div>
        <button
          type="button"
          disabled={!this.isValid() || isLoading}
          className="btn btn-primary col-md"
          onClick={this.send}>{tu("send")}</button>
      </Fragment>
    )
  }

  resetForm = ()  => {
    this.setState({
      amount: '',
      sendStatus: 'waiting',
      isLoading: false,
      to: "",
    });
  };

  renderForm() {
    let {sendStatus} = this.state;

    let {tokenBalances} = this.props;
    let {to, token, amount} = this.state;

    let isToValid = to.length === 0 || this.isAddress(to);
    let isAmountValid = this.isAmountValid();


    if (sendStatus === 'success') {
      return (
        <Fragment>
          <div className="alert alert-success text-center">
            {tu("successful_send")}
          </div>
          <div className="justify-content-center">
            <button className="btn btn-primary btn-block" onClick={this.resetForm}>
              {tu("make_another_transaction")}
            </button>
          </div>
        </Fragment>
      )
    }


    return (
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
              onChange={(ev) =>  this.setState({ token: ev.target.value }) }
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
            <input type="text"
                   onChange={(ev) => this.setAmount(ev.target.value) }
                   className={"form-control " + (!isAmountValid ? "is-invalid" : "")}
                   value={amount}
                   placeholder='0.0000'/>
            <div className="invalid-feedback">
              {tu("insufficient_tokens")}
            </div>
          </div>
        </div>
        {this.renderFooter()}
      </form>
    )
  }

  render() {

    let {account} = this.props;

    if (!account.isLoggedIn) {
      return <Redirect to="/login" />;
    }

    return (
      <main className="container-fluid pt-5 pb-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-sm-8 col-lg-5">
              <div className="card">
                <div className="card-header text-center bg-dark text-white">
                 {tu("send_trx")}
                </div>
                <div className="card-body">
                  {this.renderForm()}
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
