import React, {Component} from 'react';
import logo from '../images/tron_logo.png';
import {routes} from "../routes";
import {NavLink} from "react-router-dom";
import {filter} from "lodash";


export default class Navigation extends Component {

  render() {

    let viewableRoutes = filter(routes, r => r.showInMenu !== false);

    return (
      <nav id="topbar" className="navbar navbar-expand-md navbar-dark bg-dark">
        <div className="container">

          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-top">
            <span className="navbar-toggler-icon"/>
          </button>

          <div className="collapse navbar-collapse" id="navbar-top">
            <ul className="navbar-nav mr-auto">
              {viewableRoutes.map(route => (
                <li key={route.path} className="nav-item">
                  <NavLink className="nav-link" activeClassName="active" to={route.path}>
                    {route.label}
                  </NavLink>
                </li>
              ))}
            </ul>

          </div>
          <div className="pull-right">
            <img src={logo} className="logo" alt="Tron"/>
          </div>
        </div>
      </nav>
    )
  }
}
