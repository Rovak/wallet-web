import React, {Component} from 'react';

import TronLogo from "../../images/trans_tron_logo.png";
import {genPriKey, getAddressFromPriKey} from "../../lib/crypto/crypto";
import {base64EncodeToString, byteArray2hexStr} from "../../lib/crypto/code";
import {loginWithPassword} from "../../actions/app";
import {connect} from "react-redux";

class Login extends Component {

  constructor() {
    super();

    this.state = {
      activeTab: 'login',
      address: "",
      password: "",
      privateKey: "",
      loginPassword: "",
    };
  }

  generateAccount = () => {
    let priKeyBytes = genPriKey();
    let addressBytes = getAddressFromPriKey(priKeyBytes);
    let address = byteArray2hexStr(addressBytes);
    let pk = base64EncodeToString(priKeyBytes);
    let prikey_pwd = byteArray2hexStr(priKeyBytes);

    this.setState({
      address,
      password: pk,
      privateKey: prikey_pwd,
    })
  };

  doLogin = () => {
    let {loginPassword} = this.state;
    this.props.loginWithPassword(loginPassword);
  };

  renderLogin() {
    return (
      <div className="card-text text-center">
        <p className="text-center">
          <img src={TronLogo}/><br/>
        </p>
        <h5>Welcome to TRON!</h5>
        <p className="mt-5">
          <label>Password</label>
          <input className="form-control" type="password" onChange={(ev) => this.setState({ loginPassword: ev.target.value })}/>
        </p>
        <p>
          <button className="btn btn-outline-danger" onClick={this.doLogin}>Log in</button>
        </p>
        <p>
          <a href="javascript:;" onClick={() => this.setState({ activeTab: 'register' })} className="card-link">or register a new account</a>
        </p>
      </div>
    )
  }

  renderRegister() {

    let {address, password, privateKey} = this.state;

    return (
      <div className="card-text">
        <p className="text-center">
          <img src={TronLogo}/><br/>
        </p>
        <h5 className="text-center">Register</h5>
        <div className="mt-5">
          <p>
            <button className="btn btn-primary col-sm" onClick={this.generateAccount}>
              Click to generate your <br/>account address and password
            </button>
          </p>
          <form>
            <div className="form-group">
              <label>Account Address</label>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  onChange={(ev) => this.setState({ address: ev.target.value })}
                  value={address} />
                <div className="input-group-append">
                  <span className="input-group-text"><i className="fa fa-paste"/></span>
                </div>
              </div>
            </div>
            <div className="form-group">
              <label>Password</label>
              <div className="input-group mb-3">
                <input type="text"
                       className="form-control"
                       value={password}
                       onChange={(ev) => this.setState({ password: ev.target.value })} />
                <div className="input-group-append">
                  <span className="input-group-text"><i className="fa fa-paste"/></span>
                </div>
              </div>
            </div>
            <div className="form-group">
              <label>Private Key</label>
              <div className="input-group mb-3">
                <input type="text"
                       onChange={(ev) => this.setState({ privateKey: ev.target.value })}
                       className="form-control"
                       value={privateKey} />
                <div className="input-group-append">
                  <span className="input-group-text"><i className="fa fa-paste"/></span>
                </div>
              </div>
            </div>
            <div className="form-check">
              <input type="checkbox" className="form-check-input" />
              <label className="form-check-label">I understand that if i lose my password that i will never access my assets</label>
            </div>
            <div className="form-check">
              <input type="checkbox" className="form-check-input" />
              <label className="form-check-label">I understand if i forgot or lost my password that noone can help me recover it</label>
            </div>
            <div className="form-check">
              <input type="checkbox" className="form-check-input" />
              <label className="form-check-label">I've written my password on paper</label>
            </div>
          </form>
        </div>
        <p className="mt-3">
          <button className="btn btn-outline-danger col-sm">Create Account</button>
        </p>
      </div>
    )
  }

  render() {

    let {activeTab} = this.state;

    let page = this.renderLogin();

    if (activeTab === 'register') {
      page = this.renderRegister();
    }

    return (
      <main className="container-fluid pt-5 pb-5 bg-dark">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-sm-8 col-lg-5">
              <div className="card">
                <div className="card-header ">
                  <ul className="nav nav-tabs card-header-tabs justify-content-center">
                    <li className="nav-item">
                      <a
                          href="javascript:;"
                         className={(activeTab === 'login' ? "active" : "" ) + " nav-link" }
                         onClick={() => this.setState({ activeTab: 'login' })}>Login</a>
                    </li>
                    <li className="nav-item">
                      <a href="javascript:;"
                          className={(activeTab === 'register' ? "active" : "" ) + " nav-link" }
                         onClick={() => this.setState({ activeTab: 'register' })}>Register</a>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login)

