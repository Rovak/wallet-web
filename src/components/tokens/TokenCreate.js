import React, {Component} from 'react';
import {tu} from "../../utils/i18n";
import {Client} from "../../services/api";
import {connect} from "react-redux";
import {loadTokens} from "../../actions/tokens";
import {TextField} from "../../utils/formHelper";
import {ONE_TRX} from "../../constants";
import {FormattedNumber} from "react-intl";
import {Alert} from "reactstrap";

class TokenCreate extends Component {

  constructor() {
    super();

    let startTime = new Date();
    startTime.setHours(0, 0, 0, 0);

    let endTime = new Date();
    endTime.setHours(0, 0, 0, 0);
    endTime.setDate(startTime.getDate() + 90);

    this.state = {
      name: "",
      totalSupply: 100000,
      num: 1,
      trxNum: 1,
      startTime: startTime.toISOString().split(".")[0],
      endTime: endTime.toISOString().split(".")[0],
      description: "",
      url: "http://",
      confirmed: false,
      loading: false,
      isTokenCreated: false,
    };
  }

  submit = async () => {

    let {account} = this.props;

    this.setState({ loading: true });

    try {
      let result = await Client.createToken(account.key, {
        name: this.state.name,
        totalSupply: this.state.totalSupply,
        num: this.state.num,
        trxNum: this.state.trxNum * ONE_TRX,
        startTime: this.state.startTime,
        endTime: this.state.endTime,
        description: this.state.description,
        url: this.state.url,
      });

      if (result) {
        this.setState({
          isTokenCreated: true,
        });
      }

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

    let {num, trxNum, name, isTokenCreated} = this.state;


    let exchangeRate = trxNum / num;

    return (
      <main className="container pt-3">
        <div className="row">
          <div className="col-sm-8">
            <div className="card">
              <div className="card-header bg-dark text-white text-center">
                {tu("issue_a_token")}
              </div>
              <div className="card-body">
                <form>
                  <fieldset>
                    <legend>{tu("details")}</legend>
                    <div className="form-row">
                      <div className="form-group col-md-6">
                        <label>{tu("token_name")}</label>
                        <TextField cmp={this} field="name" />
                      </div>
                      <div className="form-group col-md-6">
                        <label>{tu("total_supply")}</label>
                        <TextField type="number" cmp={this} field="totalSupply" />
                        <small class="form-text text-muted">
                          Total amount of tokens which will be in circulation
                        </small>
                      </div>

                    </div>

                    <div className="form-row">
                      <div className="form-group col-md-12">
                        <label>{tu("description")}</label>
                        <TextField type="text" cmp={this} field="description" />
                        <small class="form-text text-muted">
                          A short description of the purpose of the token
                        </small>
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group col-md-12">
                        <label>{tu("url")}</label>
                        <TextField type="text" cmp={this} field="url" placeholder="http://" />
                        <small class="form-text text-muted">
                          A website where users can find more information about the token
                        </small>
                      </div>
                    </div>
                  </fieldset>

                  <fieldset>
                    <legend>{tu("exchange_rate")}</legend>

                    <div className="form-row text-muted">
                      <p className="col-md-12">
                        Specify the price of a single token by defining how many tokens a participant will receive for every TRX they spend.
                      </p>
                      <p className="col-md-12">
                        Participants will receive <b><FormattedNumber value={num} /> {name || tu("token")}</b>&nbsp;
                        for every <b><FormattedNumber value={trxNum} /> TRX</b>.
                      </p>
                    </div>

                    <div className="form-row">
                      <div className="form-group col-md-6">
                        <label>TRX {tu("amount")}</label>
                        <TextField type="number" cmp={this} field="trxNum" />
                      </div>
                      <div className="form-group col-md-6">
                        <label>{tu("token")} {tu("amount")}</label>
                        <TextField type="number" cmp={this} field="num" />
                      </div>
                    </div>
                    <div className="form-row">
                      <p className="col-md-12">
                        <b>{tu("token_price")}</b>: 1 {name || tu("token")} = <FormattedNumber value={exchangeRate} /> TRX
                      </p>
                    </div>
                  </fieldset>

                  <fieldset>
                    <legend>{tu("participation")}</legend>

                    <div className="form-row text-muted">
                      <p className="col-md-12">
                        Specify the participation period in which tokens will be issued.
                        During the participation period users can exchange TRX for {name} tokens.
                      </p>
                    </div>

                    <div className="form-row">
                      <div className="form-group col-md-6">
                        <label>{tu("start_date")}</label>
                        <TextField type="datetime-local" cmp={this} field="startTime" />
                      </div>
                      <div className="form-group col-md-6">
                        <label>{tu("end_date")}</label>
                        <TextField type="datetime-local" cmp={this} field="endTime" />
                      </div>
                    </div>
                  </fieldset>

                  <div className="form-group">
                    <div className="form-check">
                      <TextField type="checkbox" cmp={this} field="confirmed" className="form-check-input" />
                      <label className="form-check-label">
                        {tu("token_spend_confirm")}
                      </label>
                    </div>
                  </div>

                  {
                    isTokenCreated
                      ? <Alert color="success" className="text-center">
                          Token successfully issued
                      </Alert>
                      : <div className="text-center">
                        <button
                          disabled={!this.isValid()}
                          type="button"
                          className="btn btn-success"
                          onClick={this.submit}>{tu("issue_token")}</button>
                      </div>
                  }


                </form>
              </div>
            </div>

          </div>
          <div className="col-sm-4 mt-3 mt-sm-0">
            <div className="card">
              <div className="card-body">
                <p>
                  Issuing a token on the Tron Protocol can be done
                  by anyone who has at least 1024 TRX in their account.
                </p>
                <p>
                  When a token is issued it will be shown on the token overview page.
                  Users can then participate within the participation period and exchange their TRX
                  for tokens.
                </p>
                <p>
                  After issuing the token your account will receive the amount of tokens equal to the total supply.
                  When other users exchange their TRX for tokens then the tokens will be withdrawn from your account and you will
                  receive TRX equal to the specified exchange rate.
                </p>
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
