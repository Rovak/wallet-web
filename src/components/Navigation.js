import React, { Component } from 'react';
import logo from '../images/tron_logo.png';
import {routes} from "../routes";
import {Link} from "react-router-dom";


export default class Navigation extends Component {

  render() {
    return (
      <nav id="topbar" className="navbar navbar-expand-md navbar-dark bg-dark">
        <div className="container">

          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-top">
            <span className="navbar-toggler-icon"/>
          </button>

          <div className="collapse navbar-collapse" id="navbar-top">
            <ul className="navbar-nav mr-auto">
              {routes.map(route => (
                <li key={route.path} className="nav-item active">
                  <Link className="nav-link" to={route.path}>
                    {route.label}
                  </Link>
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
