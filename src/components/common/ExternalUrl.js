import React, { Component } from 'react';
import {tu} from "../../utils/i18n";

class ExternalUrl extends Component {
  render() {
    return (
      <div>
        <a href="#" data-toggle="modal" data-target="#ExternalUrlWarning">{this.props.url}</a>

        <div class="modal fade" id="ExternalUrlWarning" tabindex="-1" role="dialog" aria-labelledby="ExternalUrlWarning" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="ExternalUrlWarningLabel">External Link</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                {tu("The link")} <b> {this.props.url} </b> {tu("is not a verified site and therefore may not be secure. Proceed at your own risk.")} 
              </div>
              <div class="modal-footer">
                <a class="btn btn-warning" href={this.props.url} target="_blank">{tu("Proceed")}</a>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">{tu("Cancel")}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
 
export default ExternalUrl;
