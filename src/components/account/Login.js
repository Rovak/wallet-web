/*eslint-disable no-script-url*/
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import TronLogo from "../../images/trans_tron_logo.png";
import {generateAccount} from "@tronprotocol/wallet-api/src/utils/account";
import {loginWithPassword} from "../../actions/app";
import {connect} from "react-redux";
import {tu} from "../../utils/i18n";
import {CopyToClipboard} from "react-copy-to-clipboard";
import {withRouter} from "react-router-dom";
import TestNetWarning from "../dialogs/TestNetWarning";
import {IS_TESTNET} from "../../constants";

class Login extends Component {

  constructor() {
    super();

    this.state = {
      activeTab: 'login',

      // Register
      address: "",
      privateKey: "",
      registerCheck1: false,
      registerCheck2: false,
      showWarning: false,

      // Login
      loginPassword: "",
    };
  }

  componentDidMount() {
    this.generateAccount();
    document.body.classList.add('bg-dark');
  }
  

  componentWillUnmount() {
    document.body.classList.remove('bg-dark');
  }
  

  generateAccount = () => {

    let account = generateAccount();

    this.setState({
      address: account.address,
      privateKey: account.privateKey,
    })
  };

  doLogin = () => {
    let {loginPassword} = this.state;
    this.props.loginWithPassword(loginPassword);
    this.props.history.push("/account");
  };

  isRegisterFormValid = () => {
    let {registerCheck1, registerCheck2} = this.state;
    return registerCheck1 && registerCheck2;
  };

  createAccount = () => {
    this.setState({
      showWarning: true,
    });
  };

  isLoginValid = () => {
    let {loginPassword} = this.state;

    if (!loginPassword || loginPassword.length === 0) {
      return false;
    }

    if (loginPassword.length < 40) {
      return false;
    }

    return true;
  };

  renderLogin() {

    return (
      <div className="card-text text-center">
        <p className="text-center">
          <img src={TronLogo} alt="Tron"/><br/>
        </p>
        <p className="mt-5">
          <label>{tu("private_key")}</label>
          <input className="form-control"
                 type="password"
                 onChange={(ev) => this.setState({ loginPassword: ev.target.value })}/>
        </p>
        <p>
          <button
            disabled={!this.isLoginValid()}
            className="btn btn-outline-danger"
            onClick={this.doLogin}>{tu("login")}</button>
        </p>
        <p>
          <a href="javascript:;"
             onClick={() => this.setState({ activeTab: 'register' })}
             className="card-link">{tu("register_new_account")}</a>
        </p>
      </div>
    )
  }

  renderRegister() {

    let {address, privateKey} = this.state;

    return (
      <div className="card-text">
        <p className="text-center">
          <img src={TronLogo} alt="Tron"/><br/>
        </p>
        <div className="mt-5">
          <p>
            <button className="btn btn-primary col-sm" onClick={this.generateAccount}>
              <i className="fa fa-redo"/> {tu("generate_account")}
            </button>
          </p>
          <form>
            <div className="form-group">
              <label>{tu("account_address")}</label>
              <div className="input-group mb-3">
                <input
                  type="text"
                  readOnly={true}
                  className="form-control"
                  value={address} />
                <div className="input-group-append">
                  <CopyToClipboard text={address}>
                    <button className="btn btn-outline-secondary" type="button">
                      <i className="fa fa-paste"/>
                    </button>
                  </CopyToClipboard>
                </div>
              </div>
            </div>
            <div className="form-group">
              <label>{tu("private_key")}</label>
              <div className="input-group mb-3">
                <input type="text"
                       readOnly={true}
                       className="form-control"
                       value={privateKey} />
                <div className="input-group-append">
                  <CopyToClipboard text={privateKey}>
                    <button className="btn btn-outline-secondary" type="button">
                      <i className="fa fa-paste"/>
                    </button>
                  </CopyToClipboard>
                </div>
              </div>
            </div>
            <div className="form-check">
              <input type="checkbox"
                     className="form-check-input" onChange={(ev) => this.setState({ registerCheck1: ev.target.checked })} />
              <label className="form-check-label small">
                {tu("create_account_confirm_1")}
              </label>
            </div>
            <div className="form-check" onChange={(ev) => this.setState({ registerCheck2: ev.target.checked })}>
              <input type="checkbox" className="form-check-input" />
              <label className="form-check-label small">
                {tu("create_account_confirm_2")}
              </label>
            </div>
          </form>

        </div>
        <p className="mt-3">
          <button className="btn btn-outline-success col-sm"
                  disabled={!this.isRegisterFormValid()}
                  onClick={this.createAccount}>{tu("create_account")} </button>
        </p>
      </div>
    )
  }

  nextAfterRegister = () => {
    let {privateKey} = this.state;

    this.setState({
      showWarning: false,
    });

    this.props.loginWithPassword(privateKey);
    this.props.history.push("/account");
  };

  renderTestNetWarning() {

    let {showWarning} = this.state;

    return ReactDOM.createPortal(
      <TestNetWarning
        visible={showWarning}
        onClose={this.nextAfterRegister} />,
      document.getElementById("root"));
  }

  render() {

    let {activeTab} = this.state;

    let page = this.renderLogin();

    if (activeTab === 'register') {
      page = this.renderRegister();
    }

    return (
      <main className="container-fluid pt-5">
        {
            IS_TESTNET && 
            this.renderTestNetWarning()
        }  
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-sm-12 col-md-8 col-lg-6">
              <div className="card">
                <div className="card-header">
                  <ul className="nav nav-tabs card-header-tabs justify-content-center">
                    <li className="nav-item">
                      <a
                          href="javascript:;"
                          className={(activeTab === 'login' ? "active" : "" ) + " nav-link" }
                          onClick={() => this.setState({ activeTab: 'login' })}>
                        {tu("login")}
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="javascript:;"
                          className={(activeTab === 'register' ? "active" : "" ) + " nav-link" }
                          onClick={() => this.setState({ activeTab: 'register' })}>
                        {tu("register")}
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="card-body mt-5">
                  {page}
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

  };
}



const mapDispatchToProps = {
  loginWithPassword,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login))

