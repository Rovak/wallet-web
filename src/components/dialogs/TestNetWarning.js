/* eslint-disable no-undef */
import React from "react";


export default class TestNetWarning extends React.Component {

  constructor() {
    super();

    this.state = {
      visible: false,
    };
  }

  componentDidUpdate({visible}) {
    //   console.log("TOGGLE", visible, this.state);
    // if (this.state.visible !== visible) {
    //   if (visible) {
    //     $(this.$ref).modal('show');
    //   } else {
    //     $(this.$ref).modal('hide');
    //   }
    //
    //   this.setState({ visible });
    // }
  }

  render() {

    let {visible, onClose} = this.props;

    return (
      <React.Fragment>
        <div className="modal show" ref={(el) => this.$ref = el} style={{ display: visible ? 'block' : 'none'}}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-body">
                <p>Dear users,</p>
                <p>The launch of testnet aims to test all the features of our blockchain explorer and wallet.</p>
                <p>
                  <span className="font-weight-bold text-danger pr-1">
                    Please keep in mind, that since your registered account address is only used for testnet, do not send TRX from your
                    own wallet or exchange to the account address of testnet.
                  </span>
                  TRX for testing will be sent to your testing account once
                  you successfully apply through account management.
                </p>
                <p className="text-right">
                  TRON Foundation
                </p>
              </div>
              <div className="modal-footer justify-content-center">
                <button type="button" className="btn btn-danger" onClick={onClose}>
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-backdrop show" style={{ display: visible ? 'block' : 'none'}}/>
      </React.Fragment>
    )
  }

}
