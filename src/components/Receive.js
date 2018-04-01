import {connect} from "react-redux";
import React from "react";
import * as QRCode from "qrcode";
import {passwordToAddress} from "../utils/crypto";
import {tu} from "../utils/i18n";

class Receive extends React.Component {

  constructor() {
    super();

    this.state = {
      qrcode: null,
    }
  }

  componentDidMount() {
    this.renderReceiveUrl();
  }

  renderReceiveUrl() {

    let {account} = this.props;

    if (!account.isLoggedIn) {
      return;
    }

    let rootUrl = process.env.PUBLIC_URL || window.location.origin;

    QRCode.toDataURL(`${rootUrl}/#/send?to=${passwordToAddress(account.key)}`, (err, url) => {
      this.setState({
        qrcode: url,
      });
    })
  }

  render() {

    let {qrcode} = this.state;
    let {account} = this.props;

    if (!account.isLoggedIn) {
      return (
        <div class="alert alert-warning" role="alert">
          You must be logged in to receive coins
        </div>
      );
    }

    return (
      <main className="container-fluid pt-5 pb-5 bg-dark">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-sm-8 col-lg-5">
              <div className="card">
                <div className="card-header text-center">
                  Receive TRX
                </div>
                <div className="card-body">
                  {
                    qrcode && <img src={qrcode} style={{width: '100%'}} />
                  }
                </div>
                <div class="card-footer text-muted text-center">
                  Scan the code with a QR Code scanner
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
    account: state.app.account,
  };
}

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(Receive)
