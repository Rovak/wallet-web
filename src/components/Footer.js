import React, {Component} from "react";

export default class Footer extends Component {


  render() {
    return (
      <footer className="container text-center pt-1">
        <a className="mr-1 text-muted" href="https://github.com/tronprotocol/wallet-web" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-github"/>
        </a>
        <a className="mr-1 text-muted" href="https://twitter.com/tronfoundation" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-twitter"/>
        </a>
      </footer>
    )
  }
}
