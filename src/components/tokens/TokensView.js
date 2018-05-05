import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {filter, sortBy} from "lodash";
import {loadTokens} from "../../actions/tokens";
import {FormattedDate, FormattedNumber, FormattedTime} from "react-intl";
import {tu, tv} from "../../utils/i18n";
import {TextField} from "../../utils/formHelper";
import {Client} from "../../services/api";
import MediaQuery from "react-responsive";
import {ONE_TRX} from "../../constants";

const desStyle = {
    whiteSpace: "normal",
    wordSrap: "break-word",
    wordBreak:"break-all"
}
class TokensView extends Component {

  constructor() {
    super();

    this.state = {
      activeToken: -1,
      amount: 0,
      confirmed: false,
      confirmedParticipate: false,
      participateSuccess: false,
      loading: false,
    };
  }

  toggleToken(token) {
    this.setState({
      activeToken: token.name,
      amount: 0,
      confirmed: false,
      confirmedParticipate: false,
      participateSuccess: false,
      loading: false,
    })
  }

  closeToken() {
    this.setState({
      activeToken: -1,
      amount: 0,
      confirmed: false,
      confirmedParticipate: false,
      participateSuccess: false,
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

    let isSuccess = await Client.participateAsset(account.key, {
      name: token.name,
      issuerAddress: token.ownerAddress,
      amount: amount * token.price,
    });

    this.setState({
      confirmedParticipate: true,
      participateSuccess: isSuccess,
      loading: false,
    });
  };

  renderParticipateButton(token) {
    let now = new Date().getTime();
    let {activeToken} = this.state;

    if (token.startTime > now) {
      return (
        <button type="button" className="btn btn-block btn-outline-dark btn-sm" disabled>
          {tu("not_started_yet")}
        </button>
      );
    }

    if (token.endTime < now) {
      return (
        <button type="button" className="btn btn-block btn-dark btn-sm" disabled>
          {tu("finished")}
        </button>
      );
    }

    if (!this.containsToken(token)) {
      return (
        <button type="button" className="btn btn-block btn-primary btn-sm" onClick={() => this.toggleToken(token)}>
          {tu("participate")}
        </button>
      );
    }

    if (activeToken) {
      return (
        <button type="button" className="btn btn-block btn-secondary btn-sm" onClick={() => this.closeToken()}>
          {tu("close")}
        </button>
      )
    }

    return null;
  }

  renderTable() {
    let {tokens, account, searchString} = this.props;
    let {amount, confirmedParticipate, loading, participateSuccess} = this.state;

    tokens = filter(tokens, t => t.name.toUpperCase().indexOf(searchString) !== -1);
    tokens = sortBy(tokens, t => t.name);

    return (
      <table className="table table-striped">
        <thead className="thead-dark">
          <tr>
            <th style={{verticalAlign: 'baseline'}}>{tu("name")}</th>
            <th style={{verticalAlign: 'baseline'}}>{tu("issuer")}</th>
            <th style={{verticalAlign: 'baseline'}} className="text-right">{tu("total_supply")}</th>
            <th style={{verticalAlign: 'baseline'}} className="text-center">{tu("start_end_time")}</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
        {
          tokens.map((token, index) => (
            <Fragment key={index}>
              <tr key={token.name}>
                <td>
                  {(token.name.length > 25) ? token.name.substr(0, 25)+" ..." : token.name}
                </td>
                <td>
                  <span title={token.ownerAddress}>
                    {token.ownerAddress}
                  </span>
                </td>
                <td className="text-right">
                  <FormattedNumber value={token.totalSupply} />
                </td>
                <td>
                  <FormattedDate value={token.startTime}/>&nbsp;
                  <FormattedTime value={token.startTime}/>&nbsp;
                  <br/>
                  <FormattedDate value={token.endTime}/>&nbsp;
                  <FormattedTime value={token.endTime}/>
                </td>
                {
                  account.isLoggedIn && <td className="text-right">
                    {this.renderParticipateButton(token)}
                  </td>
                }
              </tr>
              {
                (confirmedParticipate && this.containsToken(token)) && (
                  participateSuccess ? <tr>
                      <td colSpan="5">
                        <div className="alert alert-success text-center">
                        {tu("participated")}
                        </div>
                      </td>
                    </tr>
                    :
                    <tr>
                      <td colSpan="5">
                        <div className="alert alert-warning text-center">
                         {tu("An_error_occurred")}
                        </div>
                      </td>
                    </tr>
                )
              }
              {
                (!confirmedParticipate && this.containsToken(token)) &&
                (
                  <tr>
                    <td colSpan="5" className="bg-white">
                      <div className="form-group row no-gutters">
                        <label className="col-2 font-weight-bold text-right">{tu("description")}</label>
                        <div className="col-sm-9">
                          <div className="pl-2" style={desStyle}>{token.description}</div>
                        </div>
                      </div>
                      <div className="form-group row no-gutters">
                        <label className="col-2 font-weight-bold text-right">{tu("price")}</label>
                        <div className="col-sm-9">
                          <div className="pl-2">
                            <FormattedNumber value={(token.price / ONE_TRX)} /> TRX
                          </div>
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
                          <div className="form-check">
                            <TextField type="checkbox" cmp={this} field="confirmed" className="form-check-input" />
                            <label className="form-check-label">
                              {
                                tv("token_exchange_confirm", {
                                  trxAmount: <b><FormattedNumber value={amount * (token.price / ONE_TRX)} /> TRX</b>,
                                  tokenAmount: <b><FormattedNumber value={amount} /> {token.name}</b>
                                }
                              )}
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="form-group row no-gutters">
                        <div className="col-2">&nbsp;</div>
                        <div className="col-sm-10">
                          <button className="btn btn-success"
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

  renderSmallDate(token) {

    let now = new Date().getTime();
    let {account} = this.props;

    if (token.endTime < now) {
      return (
        <Fragment>
          <span className="text-muted">
            Finished&nbsp;
            <FormattedDate value={token.endTime}/>&nbsp;
            <FormattedTime value={token.endTime}/>
          </span>
        </Fragment>
      );
    }

    if (token.startTime < now) {
      return (
        <Fragment>
          <span className="text-muted">
            Started&nbsp;
            <FormattedDate value={token.startTime}/>&nbsp;
            <FormattedTime value={token.startTime}/>
          </span>
          {
            (!this.containsToken(token) && account.isLoggedIn) &&  <button
              className="btn btn-primary btn-sm float-right"
              onClick={() => this.toggleToken(token)}>
              {tu("participate")}
            </button>
          }

        </Fragment>
      )
    }

    return (
      <Fragment>
          <span className="text-muted">
            Starts&nbsp;
            <FormattedDate value={token.startTime}/>&nbsp;
            <FormattedTime value={token.startTime}/>
          </span>
      </Fragment>
    );
  }

  renderSmallTable() {
    let {tokens, searchString} = this.props;
    let {amount, confirmedParticipate, loading, participateSuccess} = this.state;

    tokens = filter(tokens, t => t.name.indexOf(searchString) !== -1);
    tokens = sortBy(tokens, t => t.name);

    return (
      <Fragment>
        {
          tokens.map((token, index) => (
            <div className="media mt-1 pb-1 border-bottom" key={token.name}>
              <div className="media-body">
                <span className="float-right">
                  <FormattedNumber value={token.totalSupply} />&nbsp;
                  {tu("supply")}
                </span>
                <h5 className="mt-0 font-weight-bold">{token.name}</h5>
                <div>
                  {this.renderSmallDate(token)}
                </div>
                {
                  (confirmedParticipate && this.containsToken(token)) && (
                    participateSuccess ?
                      <div className="alert alert-success text-center">
                        {tu("participated")}
                      </div>
                      :
                      <div className="alert alert-warning text-center">
                        {tu("participated_error")}
                      </div>
                  )
                }
                {
                  (!confirmedParticipate && this.containsToken(token)) &&
                  (
                    <form className="clearfix mt-2">
                      <div className="form-group row no-gutters mb-0">
                        <label className="col-2 font-weight-bold">{tu("description")}</label>
                        <div className="col-sm-9 ml-0 ml-sm-2">
                          {token.description}
                        </div>
                      </div>
                      <div className="form-group row no-gutters mb-0">
                        <label className="col-2 font-weight-bold">{tu("price")}</label>
                        <div className="col-sm-9 ml-0 ml-sm-2">
                          <FormattedNumber value={(token.price / ONE_TRX)} /> TRX
                        </div>
                      </div>
                      <div className="form-group row no-gutters">
                        <label className="col-2 font-weight-bold">{tu("amount")}</label>
                        <div className="col-sm-2 ml-0 ml-sm-2">
                          <TextField type="number" cmp={this} field="amount" className="form-control" />
                        </div>
                      </div>
                      <div className="form-group row no-gutters">
                        <div className="col-sm-2">&nbsp;</div>
                        <div className="col-sm-10">
                          <div className="form-check">

                            <TextField type="checkbox" cmp={this} field="confirmed" className="form-check-input" />
                            <label className="form-check-label">
                              {
                                tv("token_exchange_confirm", {
                                    trxAmount: <b><FormattedNumber value={amount * (token.price / ONE_TRX)} /> TRX</b>,
                                    tokenAmount: <b><FormattedNumber value={amount} /> {token.name}</b>
                                  }
                                )}
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="form-group row no-gutters">
                        <div className="col-sm-12">
                          <button className="btn btn-success btn-block"
                                  disabled={loading || !this.isValid()}
                                  onClick={() => this.submit(token)}>
                            {tu("confirm_transaction")}
                          </button>
                        </div>
                      </div>
                    </form>
                  )
                }
              </div>
            </div>
          ))
        }
      </Fragment>

    )
  }

  render() {

    return (
      <main className="container pt-3">
        <div className="row">
          <div className="col-sm-12">
            <MediaQuery minWidth={980}>
              {this.renderTable()}
            </MediaQuery>
            <MediaQuery maxWidth={980}>
              {this.renderSmallTable()}
            </MediaQuery>
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
    searchString: state.app.searchString,
  };
}

const mapDispatchToProps = {
  loadTokens,
};

export default connect(mapStateToProps, mapDispatchToProps)(TokensView);
