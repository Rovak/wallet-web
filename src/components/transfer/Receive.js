import { connect } from "react-redux";
import React from "react";
import * as QRCode from "qrcode";
import { tu } from "../../utils/i18n";
import { Redirect } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {IS_TESTNET} from "../../constants";

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

    let rootUrl = process.env.PUBLIC_URL || window.location.origin;

    if (account.isLoggedIn) {
        QRCode.toDataURL(`${rootUrl}/#/send?to=${account.address}`, (err, url) => {
          this.setState({
            qrcode: url,
          });
        })
    }
  }

  render() {

    let { qrcode } = this.state;
    let { account } = this.props;

    if (!account.isLoggedIn) {
      return <Redirect to="/login" />;
    }

    return (
      <main className="container-fluid pt-3">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-sm-8 col-lg-5">
            {
            IS_TESTNET &&
            <div className="alert alert-danger text-center">
              {tu("do_not_send_1")}
            </div>
            }
              <div className="card">
                <div className="card-header text-center text-white bg-dark">
                  {tu("receive_trx")}
                </div>
                <div className="card-body justify-content-center text-center">
                  <p>{tu("send_trx_address")}</p>
                  <div className="input-group mb-3">
                    <input type="text"
                      readOnly={true}
                      className="form-control text-center"
                      value={account.address} />
                    <div className="input-group-append">
                      <CopyToClipboard text={account.address}>
                        <button className="btn btn-outline-secondary" type="button">
                          <i className="fa fa-paste" />
                        </button>
                      </CopyToClipboard>
                    </div>
                  </div>
                  <hr />
                  <p>{tu("scan_qr_code")}</p>

                  {
                    qrcode && <img src={qrcode} style={{ width: '50%' }} alt="account address" className="m-1" />
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
