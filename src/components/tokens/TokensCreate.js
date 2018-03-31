import React, {Component} from 'react';
import {tu} from "../../utils/i18n";

export default class TokensCreate extends Component {

  render() {
    return (
      <main className="container pt-3">
        <div className="row">
          <div className="col-sm-8">
            <form>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label>Name of the token</label>
                  <input type="text" className="form-control" />
                </div>
                <div className="form-group col-md-6">
                  <label>{tu("total_supply")}</label>
                  <input type="text" className="form-control" value={1000000} />
                  {/*<small className="form-text text-muted">*/}
                    {/*Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.*/}
                  {/*</small>*/}
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label>Quote Token Amount</label>
                  <input type="text" className="form-control" />
                </div>
                <div className="form-group col-md-6">
                  <label>Base Token Amount</label>
                  <input type="text" className="form-control" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label>Start Date</label>
                  <input type="datetime-local" className="form-control" />
                </div>
                <div className="form-group col-md-6">
                  <label>End Date</label>
                  <input type="datetime-local" className="form-control" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label>Description</label>
                  <input type="text" className="form-control" />
                </div>
                <div className="form-group col-md-6">
                  <label>Description URL</label>
                  <input type="text" className="form-control" placeholder="http://" />
                </div>
              </div>
              <div className="form-group">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="confirm_spend" />
                    <label className="form-check-label" for="confirm_spend">
                      I confirm that I have to spend 1024 TRX to create the token
                    </label>
                </div>
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-primary">Create Token</button>
              </div>
            </form>
          </div>
          <div className="col-sm-4 mt-0 mt-sm-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Creating a token</h5>
                <p className="card-text">Help text...</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    )
  }
}


