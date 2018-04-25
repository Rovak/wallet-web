import React from 'react';
import { tu } from "../../utils/i18n";

class ExternalUrlWarning extends React.Component {
  render() {
    if (!this.props.show) {
      return null;
    }

    return (
      <React.Fragment>
        <div className="modal show" style={{display: this.props.show ? 'block' : 'none'}}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-body">
                {tu("the_url")} <b>{this.props.url}</b> {tu("external_link_warning")}
              </div>
              <div className="modal-footer">
                <a href={this.props.url} target="_blank" className="mr-1 btn btn-warning">{tu("proceed")}</a>
                <button onClick={this.props.onClose} className="ml-1 btn btn-success">{tu("close")}</button>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-backdrop show" style={{display: this.props.show ? 'block' : 'none'}}/>
      </React.Fragment>
    );
  }
}

export default ExternalUrlWarning;
