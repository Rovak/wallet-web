import React, { Component } from 'react';
import logo from '../images/tron_logo.png';
import {routes} from "../routes";
import {Link} from "react-router-dom";


export default class Navigation extends Component {

  render() {
    return (
      <nav id="topbar" className="navbar navbar-expand-md navbar-dark bg-dark">
        <div className="container">

          <button className="navbar-toggler p-0 border-0" type="button" data-toggle="offcanvas">
            <span className="navbar-toggler-icon"/>
          </button>

          <div className="navbar-collapse offcanvas-collapse">
            <ul className="navbar-nav mr-auto">
              {routes.map(route => (
                <li key={route.path} className="nav-item active">
                  <Link className="nav-link" to={route.path}>
                    {route.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="pull-right">
              <img src={logo} className="logo" alt="Tron"/>

            </div>
          </div>
        </div>
      </nav>
    )
  }
}
