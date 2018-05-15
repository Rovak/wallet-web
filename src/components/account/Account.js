import React, {Component} from 'react';
import {connect} from "react-redux";
import {tu, tup} from "../../utils/i18n";
import {loadTokenBalances} from "../../actions/account";
import {BarLoader} from "../common/loaders";
import xhr from "axios";
import {find} from "lodash";
import {FormattedDate, FormattedNumber, FormattedTime} from "react-intl";
import {Redirect} from "react-router-dom";
import FreezeBalanceModal from "./FreezeBalanceModal";
import {Client} from "../../services/api";
import {buildUnfreezeBalance} from "@tronprotocol/wallet-api/src/utils/transaction";
import {ONE_TRX, IS_TESTNET} from "../../constants";
import {Modal, ModalBody, ModalHeader} from "reactstrap";

class Account extends Component {

  constructor() {
    super();
    this.state = {
      waitingForTrx: false,
      showRequest: true,
      showPassword: false,
      modal: null,
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
    if (account.isLoggedIn)
      loadTokenBalances(account.address);
  };

  renderTronix() {

    let {tokenBalances = []} = this.props;

    if (tokenBalances.length === 0) {
      return (
        <div className="text-center d-flex justify-content-center p-4">
          <BarLoader/>
        </div>
      );
    }

    let trx = find(tokenBalances, token => token.name === "TRX");

    return (
      <div className="t-3">
        {
          trx && <div className="text-center">
            <h2 className="text-secondary">{tu("trx_balance")}</h2>
            <h1>
              <FormattedNumber value={trx.balance}/>
            </h1>
          </div>
        }
      </div>
    )
  }

  renderTokens() {

    let {tokenBalances = []} = this.props;

    if (tokenBalances.length === 0) {
      return (
        <div className="text-center d-flex justify-content-center p-4">
          <BarLoader/>
        </div>
      );
    }


    if (tokenBalances.length < 2) {
        
        return (
            <h3 className="text-center text-secondary p-3" colSpan="2">{tu("no_tokens_found")}</h3>
        );
        
    }else{
        
        return (
                
           <table className="table border-0 m-0">
            <thead>
            <tr>
              <th>{tu("name")}</th>
              <th className="text-right">{tu("balance")}</th>
            </tr>
            </thead>
            <tbody>
            {
            tokenBalances.map((token, index) => (

                (index > 0) && //Hide TRON TRX on this view
                <tr key={index}>
                  <td>{token.name}</td>
                  <td className="text-right">
                    <FormattedNumber value={token.balance}/>
                  </td>
                </tr>

              ))
            }
            </tbody>
            </table>
                
        );  
    }
 }   
  
  

  requestTrx = async () => {
    let {account} = this.props;

    this.setState({waitingForTrx: true});

    try {

      let address = account.address;

      let {data} = await xhr.post(`https://tronscan.org/request-coins`, {
        address,
      });

      this.setState({
        trxRequestResponse: {
          success: data.success,
          code: data.code,
          message: data.message,
        },
      });

      setTimeout(() => this.reloadTokens(), 1200);

    } catch (e) {
      this.setState({
        trxRequestResponse: {
          success: false,
          code: 9,
          message: tu("An_unknown_error_occurred,_please_try_again_in_a_few_minutes")
        },
      })
    }
    finally {
      this.setState({
        waitingForTrx: false
      });
    }
  };

  togglePassword = () => {
    this.setState({
      showPassword: true
    });
  };


  renderFrozenTokens() {

    let {frozen} = this.props;

    if (frozen.balances.length === 0) {
      return null;
    }

    return (
      <table className="table border-0 m-0">
        <thead className="thead-light">
        <tr>
          <th>{tu("amount")}</th>
          <th className="text-right">{tu("expires")}</th>
        </tr>
        </thead>
        <tbody>
        {
          frozen.balances.map((balance, index) => (
            <tr key={index}>
              <td>
                <FormattedNumber value={balance.amount / ONE_TRX} />
              </td>
              <td className="text-right">
                <FormattedDate value={balance.expires}/>&nbsp;
                <FormattedTime value={balance.expires}/>
              </td>
            </tr>
          ))
        }
        </tbody>
      </table>
    )
  }

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
            1000000 TRX {tu("have_been_added_to_your_account!")}
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
          {tu("request_trx_for_testing")}
        </button>
        <p className="pt-1">
          {tu("information_message_1")}
        </p>
      </React.Fragment>
    );
  }

  showFreezeBalance = () => {
    this.setState({
      modal: (
        <FreezeBalanceModal
          onHide={() => this.setState({ modal: null })}
          onConfirm={() => {
            this.setState({ modal: null });
            setTimeout(() => this.reloadTokens(), 1200);
          }}
        />
      )
    })
  };

  unfreeze = async () => {
    let {account} = this.props;
    let transaction = buildUnfreezeBalance(account.address);
    let success = await Client.signTransaction(account.key, transaction);

    if (success) {
      this.setState({
        modal: null,
      });
      setTimeout(() => this.reloadTokens(), 1200);
    } else {
      this.setState({
        modal: (
          <Modal isOpen={true} toggle={this.hideModal} fade={false} className="modal-dialog-centered" >
            <ModalBody className="text-center">
              <p>
              {tu("unfreeze_error")}
              </p>
              <button className="btn btn-primary mr-2" onClick={() => this.setState({ modal: null })}>
                {tu("Close")}
              </button>
            </ModalBody>
          </Modal>
        ),
      });
    }
  };

  unfreezeBalance = async () => {

    this.setState({
      modal: (
        <Modal isOpen={true} toggle={this.hideModal} fade={false} className="modal-dialog-centered" >
          <ModalHeader className="text-center" toggle={this.hideModal}>
            {tu("unfreeze_trx")}
          </ModalHeader>
          <ModalBody className="text-center">
            <p>
              {tu("unfreeze_question")}
            </p>
            <button className="btn btn-secondary mr-2" onClick={() => this.setState({ modal: null })}>
              {tu("cancel")}
            </button>
            <button className="btn btn-danger" onClick={this.unfreeze}>
              <i className="fa fa-fire mr-2"/>
              {tu("unfreeze_trx")}
            </button>
          </ModalBody>
        </Modal>
      )
    });
  };

  render() {

    let {showRequest, showPassword, modal} = this.state;
    let {account, frozen} = this.props;

    if (!account.isLoggedIn) {
      return <Redirect to="/login"/>;
    }

    let address = account.address;
    let key = account.key;

    let hasFrozen = frozen.balances.length > 0;

    return (
      <main className="container pt-3">
        {modal}
        
        {
            IS_TESTNET &&
            <div className="alert alert-danger text-center">
              {tu("do_not_send_1")}
            </div>
        }
        
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header text-center bg-dark text-white">
                {tu("account")}
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-2">
                    <b>{tu("address")}</b>
                  </div>
                  <div className="col-md-10">
                    {address}
                    
                    {
                        IS_TESTNET &&
                         
                        <div className="text-danger">
                          ({tu("do_not_send_2")})
                        </div>
                    }
                  </div>
                </div>
                <div className="row pt-3">
                  <div className="col-md-2">
                    <b>{tu("private_key")}</b>
                  </div>
                  <button className={"btn btn-primary btn-sm " + (showPassword ? 'hide' : 'show')}
                          onClick={this.togglePassword}>
                    {tu("show_private_key")}
                  </button>
                  <div className={showPassword ? 'col-md-10 show' : 'col-md-10 hide'}>
                    {key}<br/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body p-3 border-0">
                {this.renderTronix()}
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header border-bottom-0 text-center bg-dark text-white">
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
              <div className="card-header border-bottom-0 text-center bg-dark text-white">
                {tu("frozen_trx_tokens")}
              </div>
              {this.renderFrozenTokens()}
              <div className="card-body text-center">
                <p className="card-text">
                {tup("freeze_trx_txt")}
                </p>
                {
                  hasFrozen && <button className="btn btn-danger mr-2" onClick={this.unfreezeBalance}>
                    <i className="fa fa-fire mr-2"/>
                    {tu("unfreeze")}
                  </button>
                }
                <button className="btn btn-primary mr-2" onClick={this.showFreezeBalance}>
                  <i className="fa fa-snowflake mr-2"/>
                  {tu("freeze")}
                </button>
              </div>
            </div>
          </div>
        </div>
        {
          IS_TESTNET && showRequest && <div className="row mt-3">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header border-bottom-0 text-center bg-dark text-white">
                  {tu("testnet")}
                </div>
                <div className="card-body text-center">
                  {this.renderTestnetRequest()}
                </div>
              </div>
            </div>
          </div>
        }
      </main>
    )
  }
}

function mapStateToProps(state) {
  return {
    account: state.app.account,
    tokenBalances: state.account.tokens,
    frozen: state.account.frozen,
  };
}

const mapDispatchToProps = {
  loadTokenBalances,
};

export default connect(mapStateToProps, mapDispatchToProps)(Account)

