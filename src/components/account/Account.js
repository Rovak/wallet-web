import React, {Component} from 'react';
import {connect} from "react-redux";
import {tu} from "../../utils/i18n";
import {loadTokenBalances} from "../../actions/account";
import {BarLoader} from "../common/loaders";
import {passwordToAddress} from "tronaccount/src/utils/crypto";
import xhr from "axios";
import {FormattedNumber} from "react-intl";
import {Link, Redirect} from "react-router-dom";

class Account extends Component {

  constructor() {
    super();
    this.state = {
      waitingForTrx: false,
      showRequest: true,
      showPassword:false,
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
    if(account.isLoggedIn)
      loadTokenBalances(passwordToAddress(account.key));
  };

  isTronix(index){
      if (index == 0) {
            return (
                  "bg-primary"
            );
      }
  }
  
  renderTronix() {

    let {tokenBalances = []} = this.props;

    if (tokenBalances.length === 0) {
      return (
        <div className="text-center d-flex justify-content-center p-4">
          <BarLoader/>
        </div>
      );
    }

    return (
      <div className="t-3">
        {
          tokenBalances.map((token, index) => (
            
            (index === 0 && token.name == "TRX") && //Only shows TRON TRX on this view   
             <div className="text-center">
              <h2 className="text-secondary">{tu("trx_balance")}</h2>
              <h1>
               <FormattedNumber value={token.balance}/>
              </h1>    
             </div> 
            
          ))
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
                <FormattedNumber value={token.balance} />
              </td>
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

      setTimeout(() => this.reloadTokens(), 1500);

    } catch(e) {
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

  showPword (){
      this.setState({
          showPassword: true
      });
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

  render() {

    let {account} = this.props;
    if (!account.isLoggedIn) {
      return <Redirect to="/login" />;
    }     
   
    let {showRequest,showPassword} = this.state;
    let address = passwordToAddress(account.key);
    let key = account.key;

    return (
      <main className="container pt-3">
        <div className="alert alert-danger text-center">
          {tu("do_not_send_1")}
        </div>
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
                    {address}<br/>
                    <span className="text-danger">
                      ({tu("do_not_send_2")})
                    </span>
                  </div>
                </div>
                <div className="row pt-3">
                  <div className="col-md-2">
                    <b>{tu("password")}</b>
                  </div>
                  <button className={"btn btn-primary btn-sm " + (showPassword ? 'hide' : 'show')} onClick={this.showPword.bind(this)}>
                      {tu("showpassword")}
                  </button>
                  <div className={showPassword?'col-md-10 show':'col-md-10 hide'}>
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
        {
          showRequest && <div className="row mt-3">
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
  };
}

const mapDispatchToProps = {
  loadTokenBalances,
};

export default connect(mapStateToProps, mapDispatchToProps)(Account)

