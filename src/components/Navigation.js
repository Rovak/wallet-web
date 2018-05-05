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
    
    let allMenuRoutes = filter(routes, r => r.showInMenu !== false);
    let viewableRoutes = null;
    
    if (account.isLoggedIn){
        viewableRoutes = allMenuRoutes;
    }else{
        viewableRoutes = filter(allMenuRoutes, r => r.showLoggedIn !== true);
    }
    
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
                <a className="nav-link dropdown-toggle dropdown-menu-right " data-toggle="dropdown" href="javascript:;">{activeLanguage.toUpperCase()}</a>
                <div className="dropdown-menu">
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
                    <li className="nav-item">
                      <div className="btn-group ml-2">
                        <Link className="btn btn-secondary btn-sm mt-1" to="/account">
                          <i className="fa fa-user mr-2"/>
                            {tu("account")}
                        </Link>
                        <button type="button" className="btn btn-sm btn-secondary btn-sm mt-1 dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          <span className="sr-only">Toggle Dropdown</span>
                        </button>
                        <div className="dropdown-menu">
                          <Link className="dropdown-item hide" to="/account/transactions">
                            <i className="fa fa-exchange-alt mr-2"/>
                            {tu("my_transactions")}
                          </Link> 
                          <Link className="dropdown-item" to="/account/votes">
                            <i className="fa fa-clipboard-check mr-2"/>
                            {tu("votes")}
                          </Link>
                          <Link className="dropdown-item" to="/account/apply-for-delegate">
                            <i className="fa fa-briefcase mr-2"/>
                            {tu("apply_for_delegate")}
                          </Link>
                          <div className="dropdown-divider"/>
                          <a className="dropdown-item" href="javascript:;" onClick={this.logout}>
                            <i className="fa fa-sign-out-alt mr-2"/>
                            {tu("sign_out")}
                          </a>
                        </div>
                      </div>
                    </li>
                  :
                    <li className="nav-item">
                       <Link className="btn btn-secondary btn-sm mt-1" to="/login">
                         <i className="fa fa-sign-in-alt mr-2" />
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
