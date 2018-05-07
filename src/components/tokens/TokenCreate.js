import React, { Component } from "react";
import { injectIntl } from "react-intl";
import { t, tu } from "../../utils/i18n";
import { Client } from "../../services/api";
import { connect } from "react-redux";
import { loadTokens } from "../../actions/tokens";
import { ONE_TRX } from "../../constants";
import TokenForm from "./TokenForm";
import {Redirect} from "react-router-dom";

class TokenCreate extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      isTokenCreated: false
    };
  }

  isValid = ({
    name,
    totalSupply,
    num,
    trxNum,
    startTime,
    endTime,
    description,
    url,
    confirmed
  }) => {
    let { loading } = this.state;
    if (
      loading ||
      name.length === 0 ||
      totalSupply <= 0 ||
      num <= 0 ||
      trxNum <= 0 ||
      !startTime ||
      !endTime ||
      description.length === 0 ||
      url.length === 0
    ) {
      return false;
    }

    return confirmed;
  };

  render() {
      
    let {account} = this.props;
    if (!account.isLoggedIn) {
      return <Redirect to="/login" />;
    }
    
    const submitHandler = async formValues => {
      let { account } = this.props;

      this.setState({ loading: true });

      formValues = { ...formValues, trxNum: formValues.trxNum * ONE_TRX };

      try {
        let result = await Client.createToken(account.key, formValues);

        if (result) {
          this.setState({ isTokenCreated: true });
        }
      } finally {
        this.setState({ loading: false });
      }
    };

    return (
      <main className="container pt-3">
        <div className="row">
          <div className="col-sm-8">
            <div className="card">
              <div className="card-header bg-dark text-white text-center">
                {tu("issue_a_token")}
              </div>
              <div className="card-body">
                <TokenForm
                  onSubmit={submitHandler}
                  isValid={this.isValid}
                  isTokenCreated={this.state.isTokenCreated}
                  intl={this.props.intl}
                />
              </div>
            </div>
          </div>
          <div className="col-sm-4 mt-3 mt-sm-0">
            <div className="card">
              <div className="card-body">
                <p>{t("token_issue_guide_message_1")}</p>
                <p>{t("token_issue_guide_message_2")}</p>
                <p>{t("token_issue_guide_message_3")}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

function mapStateToProps(state) {
  return {
    tokens: state.tokens.tokens,
    account: state.app.account
  };
}

const mapDispatchToProps = {
  loadTokens
};

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(TokenCreate));
