import React, {Component} from 'react';
import logo from '../images/tron_logo.png';
import {routes} from "../routes";
import {Link, NavLink} from "react-router-dom";
import {filter} from "lodash";
import {tu} from "../utils/i18n";


export default class Navigation extends Component {

  setLanguage(language) {
    this.props.languageChanged(language);
  }

  render() {

    let {languages, activeLanguage, account} = this.props;

    let viewableRoutes = filter(routes, r => r.showInMenu !== false);

    return (
      <nav id="topbar" className="navbar navbar-expand-md navbar-dark bg-dark">
        <div className="d-none d-md-block position-fixed">
          <img src={logo} className="logo" alt="Tron"/>
        </div>
        <div className="container">
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-top">
            <span className="navbar-toggler-icon"/>
          </button>


          <div className="d-md-none pull-right">
            <img src={logo} className="logo" alt="Tron"/>
          </div>

          <div className="collapse navbar-collapse" id="navbar-top">
            <ul className="navbar-nav mr-auto">
              {viewableRoutes.map(route => (
                <li key={route.path} className="nav-item">
                  <NavLink className="nav-link" activeClassName="active" to={route.path}>
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
                        <button type="button" className="btn btn-secondary">
                          <i className="fa fa-user mr-2"/>
                          Account
                        </button>
                        <button type="button" className="btn btn-sm btn-secondary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          <span className="sr-only">Toggle Dropdown</span>
                        </button>
                        <div className="dropdown-menu">
                          <a className="dropdown-item" href="#">
                            <i className="fa fa-sign-out-alt mr-2"/>
                            {tu("sign_out")}
                          </a>
                        </div>
                      </div>
                    </li>
                  :
                    <li className="nav-item">
                       <Link className="btn btn-secondary my-2 my-sm-0 text-white" to="/login">
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
