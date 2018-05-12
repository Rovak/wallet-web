import React, {Component} from "react";
import packageJson from '../../package.json';
import {IS_TESTNET} from "../constants";

export default class Footer extends Component {


  render() {
    return (   
      <footer className="footer text-center mt-3 mb-2">
        <a className="mr-1 text-muted" href={packageJson.bugs.url} target="_blank" rel="noopener noreferrer">
          <i className="fab fa-github social mr-2"/>
        </a>
        <a className="mr-1 text-muted" href="https://twitter.com/tronfoundation" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-twitter social ml-2"/>
        </a>
        <div>
            <small>Tron Wallet v.{packageJson.version}
            {
            IS_TESTNET && 
            <span>
              &nbsp;(Testnet)
             </span>
            }  
            </small>        
        </div>
      </footer>
    )
  }
}
