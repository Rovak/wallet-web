import React, {Component} from 'react';
import {tu} from "../../utils/i18n";
import {Client} from "../../services/api";
import {connect} from "react-redux";
import {loadTokens} from "../../actions/tokens";
import {TextField} from "../../utils/formHelper";

class TokenCreate extends Component {

  constructor() {
    super();

    this.state = {
      name: "",
      totalSupply: 100000,
      num: "",
      trxNum: "",
      startTime: "",
      endTime: "",
      description: "",
      url: "",
      confirmed: false,
      loading: false,
    };
  }

  submit = async () => {

    let {account} = this.props;

    this.setState({ loading: true });

    try {
      await Client.createToken(account.key, {
        name: this.state.name,
        totalSupply: this.state.totalSupply,
        num: this.state.num,
        trxNum: this.state.trxNum,
        startTime: this.state.startTime,
        endTime: this.state.endTime,
        description: this.state.description,
        url: this.state.url,
      })
    } finally {
      this.setState({ loading: false });
    }
  };

  isValid = () => {

    let {loading, name, totalSupply, num, trxNum, startTime, endTime, description, url}  = this.state;

    if (loading) {
      return false;
    }

    if (name.length === 0) {
      return false;
    }

    if (totalSupply <= 0) {
      return false;
    }

    if (num <= 0) {
      return false;
    }

    if (trxNum <= 0) {
      return false;
    }

    if (!startTime) {
      return false;
    }

    if (!endTime) {
      return false;
    }

    if (description.length === 0) {
      return false;
    }

    if (url.length === 0) {
      return false;
    }

    return this.state.confirmed;
  };


  render() {
    return (
      <main className="container pt-3">
        <div className="row">
          <div className="col-sm-8">
            <form>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label>Name of the token</label>
                  <TextField cmp={this} field="name" />
                </div>
                <div className="form-group col-md-6">
                  <label>{tu("total_supply")}</label>
                  <TextField type="number" cmp={this} field="totalSupply" />
                  {/*<small className="form-text text-muted">*/}
                    {/*Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.*/}
                  {/*</small>*/}
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label>Quote Token Amount</label>
                  <TextField type="number" cmp={this} field="num" />
                </div>
                <div className="form-group col-md-6">
                  <label>Base Token Amount</label>
                  <TextField type="number" cmp={this} field="trxNum" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label>Start Date</label>
                  <TextField type="datetime-local" cmp={this} field="startTime" />
                </div>
                <div className="form-group col-md-6">
                  <label>End Date</label>
                  <TextField type="datetime-local" cmp={this} field="endTime" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label>Description</label>
                  <TextField type="text" cmp={this} field="description" />
                </div>
                <div className="form-group col-md-6">
                  <label>Description URL</label>
                  <TextField type="text" cmp={this} field="url" placeholder="http://" />
                </div>
              </div>
              <div className="form-group">
                <div className="form-check">
                  <TextField type="checkbox" cmp={this} field="confirmed" className="form-check-input" />
                    <label className="form-check-label">
                      I confirm that I have to spend 1024 TRX to create the token
                    </label>
                </div>
              </div>
              <div className="text-center">
                <button
                  disabled={!this.isValid()}
                  type="button"
                  className="btn btn-primary"
                  onClick={this.submit}>Create Token</button>
              </div>
            </form>
          </div>
          <div className="col-sm-4 mt-0 mt-sm-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Creating a token</h5>
                {/*<p className="card-text">Help text...</p>*/}
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
    tokens: state.tokens.tokens,
    account: state.app.account,
  };
}

const mapDispatchToProps = {
  loadTokens,
};

export default connect(mapStateToProps, mapDispatchToProps)(TokenCreate);
