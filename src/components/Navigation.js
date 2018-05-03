/*eslint-disable no-script-url*/
import React, {Component} from 'react';
import logo from '../images/tron_logo.png';
import {routes} from "../routes";
import {Link, NavLink, withRouter} from "react-router-dom";
import {filter} from "lodash";
import {tu} from "../utils/i18n";
import {logout, setLanguage} from "../actions/app";
import {connect} from "react-redux";

class Navigation extends Component {

  setLanguage = (language) => {
    this.props.setLanguage(language);
  };

  logout = () => {
    this.props.logout();
    this.props.history.push("/");
  };

  render() {

    let {languages, activeLanguage, account} = this.props;

    let viewableRoutes = filter(routes, r => r.showInMenu !== false);

    return (
      <nav className="navbar navbar-expand-md navbar-dark bg-dark">
        <div className="container">
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-top">
            <span className="navbar-toggler-icon"/>
          </button>
          <div className="d-md-none pull-right">
            <img src={logo} className="logo" alt="Tron"/>
          </div>
          <div className="collapse navbar-collapse" id="navbar-top">
            <ul className="navbar-nav mr-auto">
                <li  className="nav-item d-none d-md-block">
                  <img src={logo} className="logo" alt="Tron"/>
                </li>
              {viewableRoutes.map(route => (
                <li key={route.path} className="nav-item">
                  <NavLink className="nav-link" activeClassName="active" to={route.path}>
                    {
                        (route.icon !== ''?  <i className={route.icon}/> : '')
                    }
                    {tu(route.label)}
                  </NavLink>
                </li>
              ))}
            </ul>
            <ul className="navbar-nav navbar-right">
              <li className="nav-item dropdown navbar-right">
                <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="javascript:;">{activeLanguage.toUpperCase()}</a>
                <div className="dropdown-menu dropdown-menu-right">
                  {
                    Object.keys(languages).map(language => (
                      <a key={language}
                         className="dropdown-item"
                         href="javascript:;"
                         onClick={() => this.setLanguage(language)}>{languages[language]}</a>
                    ))
                  }
                </div>
              </li>
              {
                account.isLoggedIn
                  ?
                    <li className="nav-item dropdown navbar-right">
                      <a className="nav-link dropdown-toggle dropdown-menu-left" data-toggle="dropdown" href="javascript:;">{tu("account")}</a>
                      <div className="dropdown-menu dropdown-menu-right">
                        <Link className="dropdown-item" to="/account">
                            <span className="align-middle">{tu("account")}</span>
                        </Link>
                        <Link className="dropdown-item" to="/account/votes">
                          {tu("votes")}
                        </Link>
                        <Link className="dropdown-item" to="/account/apply-for-delegate">
                          {tu("apply_for_delegate")}
                        </Link>
                        <div className="dropdown-divider"/>
                        <a className="dropdown-item" href="javascript:;" onClick={this.logout}>
                          {tu("sign_out")}
                        </a>
                      </div>
                    </li>
                  :
                    <li class="nav-item">
                      <Link class="nav-link" to="/login">
                        {tu("register_login")}
                      </Link>
                    </li>
              }
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

function mapStateToProps(state) {
  return {
    activeLanguage: state.app.activeLanguage,
    languages: state.app.availableLanguages,
    account: state.app.account,
  };
}

const mapDispatchToProps = {
  setLanguage,
  logout
};

export default connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(withRouter(Navigation))
