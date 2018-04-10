import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {loadTokens} from "../../actions/tokens";
import {FormattedDate, FormattedTime} from "react-intl";
import {tu} from "../../utils/i18n";
import {TextField} from "../../utils/formHelper";
import {Client} from "../../services/api";

class TokensView extends Component {

  constructor() {
    super();

    this.state = {
      activeToken: -1,
      amount: 0,
      confirmed: false,
      confirmedParticipate: false,
      loading: false,
    };
  }

  toggleToken(token) {
    this.setState({
      activeToken: token.name,
      amount: 0,
      confirmed: false,
      confirmedParticipate: false,
      loading: false,
    })
  }

  containsToken(token) {
    let {activeToken} = this.state;
    return activeToken === token.name;
  }

  componentDidMount() {
    this.props.loadTokens();
  }

  isValid = () => {
    let {confirmed, amount} = this.state;

    return confirmed && (amount > 0);
  };

  submit = async (token) => {

    let {account} = this.props;
    let {amount} = this.state;

    this.setState({ loading: true, });

    await Client.participateAsset(account.key, {
      name: token.name,
      issuerAddress: token.ownerAddress,
      amount: amount * 1000000,
    });

    this.setState({
      confirmedParticipate: true,
      loading: false,
    })
  };

  renderTable() {
    let {tokens} = this.props;
    let {amount, confirmedParticipate, loading} = this.state;

    return (
      <table className="table">
        <thead>
        <tr>
          <th>{tu("name")}</th>
          <th>{tu("issuer")}</th>
          <th>{tu("total_supply")}</th>
          <th>{tu("start_end_time")}</th>
          <th>&nbsp;</th>
        </tr>
        </thead>
        <tbody>
        {
          tokens.map((token, index) => (
            <Fragment key={index}>
              <tr key={token.name}>
                <td>{token.name}</td>
                <td>
                  <span title={token.ownerAddress}>
                    {token.ownerAddress.substr(0, 16)}...
                  </span>
                </td>
                <td>{token.totalSupply}</td>
                <td>
                  <FormattedDate value={token.startTime}/>&nbsp;
                  <FormattedTime value={token.startTime}/>&nbsp;
                  -&nbsp;
                  <FormattedDate value={token.endTime}/>&nbsp;
                  <FormattedTime value={token.endTime}/>
                </td>
                <td className="text-right">
                  { !this.containsToken(token) &&
                    <button type="button" class="btn btn-primary btn-sm" onClick={() => this.toggleToken(token)}>
                      Participate
                    </button>
                  }
                </td>
              </tr>
              {
                (confirmedParticipate && this.containsToken(token)) && <tr>
                  <td colSpan="5">
                    <div className="alert alert-success text-center">
                      You succesfully partipated!
                    </div>
                  </td>
                </tr>
              }
              {
                (!confirmedParticipate && this.containsToken(token)) &&
                (
                  <tr>
                    <td colSpan="5">
                      <div className="form-group row no-gutters">
                        <label className="col-2 font-weight-bold text-right">{tu("description")}</label>
                        <div className="col-sm-9">
                          <div className="pl-2">{token.description}</div>
                        </div>
                      </div>
                      <div className="form-group row no-gutters">
                        <label className="col-2 font-weight-bold text-right">{tu("price")}</label>
                        <div className="col-sm-9">
                          <div className="pl-2">{token.price} TRX</div>
                        </div>
                      </div>
                      <div className="form-group row no-gutters">
                        <label className="col-2 font-weight-bold text-right">{tu("amount")}</label>
                        <div className="col-sm-2 pl-2">
                          <TextField type="number" cmp={this} field="amount" className="form-control" />
                        </div>
                      </div>
                      <div className="form-group row no-gutters">
                        <div className="col-2">&nbsp;</div>
                        <div className="col-sm-10">
                          <TextField type="checkbox" cmp={this} field="confirmed" className="form-check-input" />
                          <label className="form-check-label">
                            I've confirmed to spend <b>{amount} TRX</b> on token distribution,
                            and get a total of <b>{amount * token.price} {token.name} tokens</b> tokens.
                          </label>
                        </div>
                      </div>
                      <div className="form-group row no-gutters">
                        <div className="col-2">&nbsp;</div>
                        <div className="col-sm-10">
                          <button class="btn btn-success"
                                  disabled={loading || !this.isValid()}
                                    onClick={() => this.submit(token)}>
                            {tu("confirm_transaction")}
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                )
              }
            </Fragment>
          ))
        }
        </tbody>
      </table>
    );
  }

  render() {

    return (
      <main className="container pt-3">
        <div className="row">
          <div className="col-sm-12">
              {this.renderTable()}
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

export default connect(mapStateToProps, mapDispatchToProps)(TokensView);
