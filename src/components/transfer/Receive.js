import { connect } from "react-redux";
import React from "react";
import * as QRCode from "qrcode";
import { tu } from "../../utils/i18n";
import { Link } from "react-router-dom";
import { passwordToAddress } from "@tronprotocol/wallet-api/src/utils/crypto";

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

    let { account } = this.props;

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

    let { qrcode } = this.state;
    let { account } = this.props;

    if (!account.isLoggedIn) {
      return (
        <div>
          <div className="alert alert-warning">
            {tu("require_account_to_receive")}
          </div>
          <p className="text-center">
            <Link to="/login">{tu("Go to login")}</Link>
          </p>
        </div>
      );
    }

    return (
      <main className="container-fluid pt-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-sm-8 col-lg-5">
              <div className="card">
                <div className="card-header text-center text-white bg-dark">
                  {tu("receive_trx")}
                </div>
                <div className="card-body justify-content-center text-center">
                  <p>{tu("send_trx_address")}</p>
                  <h5><b>{passwordToAddress(account.key)}</b></h5>
                  <hr />
                  <p>{tu("scan_qr_code")}</p>

                  {
                    qrcode && <img src={qrcode} style={{ width: '50%' }} alt="account address" className="m-2"/>
                  }
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
