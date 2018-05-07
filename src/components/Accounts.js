import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { loadAccounts } from "../actions/app";
import MediaQuery from "react-responsive";
import { tu } from "../utils/i18n";
import { BarLoader } from "./common/loaders";
import { FormattedNumber, injectIntl } from "react-intl";
import { filter, map, extend } from "lodash";
import PaginationBar from "./common/PaginationBar";

class Accounts extends Component {
  constructor() {
    super();

    this.state = {
      searchString: "",
      pagedElements: []
    };
  }

  componentDidMount() {
    this.props.loadAccounts();
  }

  onChangePage = pagedElements => {
    this.setState({ pagedElements });
  };

  onSearchFieldChangeHandler = e => {
    this.setState({
      searchString: e.target.value
    });
  };

  filteredElements = () => {
    let { accounts } = this.props;
    let { searchString } = this.state;

    searchString = searchString.toUpperCase();

    if (searchString.length > 0) {
      accounts = filter(
        accounts,
        a => a.address.toUpperCase().indexOf(searchString) !== -1
      );
    }

    return map(accounts, (o, i) => extend({ index: i + 1 }, o));
  };

  renderAccounts() {
    let { accounts } = this.props;
    let { pagedElements } = this.state;

    if (accounts.length === 0) {
      return (
        <div className="text-center d-flex justify-content-center py-5">
          <BarLoader />
        </div>
      );
    }

    return (
      <Fragment>
        <MediaQuery minWidth={980}>
          <table className="table table-striped">
            <thead className="thead-dark">
              <tr>
                <th>#</th>
                <th>{tu("address")}</th>
                <th className="text-right">{tu("balance")}</th>
              </tr>
            </thead>
            <tbody>
              {pagedElements.map(account => (
                <tr key={account.address}>
                  <th scope="row">{account.index}</th>
                  <td>{account.address}</td>
                  <td className="text-right">
                    <FormattedNumber value={account.balanceNum} /> TRX
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </MediaQuery>
        <MediaQuery maxWidth={980}>
          <div className="p-3">
            {pagedElements.map(account => (
              <div className="media small mb-2" key={account.address}>
                <div className="block">#{account.index}</div>
                <div className="media-body mb-0 lh-150">
                  <div className="ml-3">{account.address.toUpperCase()}</div>
                  <div className="ml-3 text-muted">
                    <FormattedNumber value={account.balanceNum} /> TRX
                  </div>
                </div>
              </div>
            ))}
          </div>
        </MediaQuery>
      </Fragment>
    );
  }

  renderPagination() {
    let { accounts } = this.props;
    let { searchString } = this.state;

    return (
      <Fragment>
        <MediaQuery minWidth={980}>
          <PaginationBar
            elements={accounts}
            searchString={searchString}
            filteredElements={this.filteredElements}
            onChangePage={this.onChangePage}
          />
        </MediaQuery>
        <MediaQuery maxWidth={980}>
          <PaginationBar
            elements={accounts}
            searchString={searchString}
            filteredElements={this.filteredElements}
            onChangePage={this.onChangePage}
            blockSize={5}
          />
        </MediaQuery>
      </Fragment>
    );
  }

  render() {
    let { accounts, intl } = this.props;
    let { searchString } = this.state;

    return (
      <main role="main" className="container mt-3">
        <div className="row">
          <div className="col-md-12">
            <input
              type="text"
              placeholder={intl.formatMessage({ id: "search_address" })}
              onChange={this.onSearchFieldChangeHandler}
              className="form-control"
              value={searchString}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="p-3 my-3 text-white-50 bg-dark rounded row no-gutters">
              <div className="col-md-3 d-flex align-items-center mb-3 mb-md-0">
                <i className="fas fa-piggy-bank fa-3x mr-3" style={{ width: 50 }}/>
                <div className="lh-100">
                  <h6 className="mb-0 text-white lh-100">{tu("accounts")}</h6>
                  <small>
                    <FormattedNumber value={accounts.length} />
                  </small>
                </div>
              </div>
              <div className="col-md-3 ml-md-auto d-flex align-items-center mb-3 mb-md-0">
                <i className="fas fa-trophy fa-3x mr-3" style={{ width: 50 }} />
                <div className="lh-100">
                  <h6 className="mb-0 text-white lh-100">{tu("most_trx")}</h6>
                  <small>
                    {accounts[0] && <FormattedNumber value={accounts[0].balanceNum} />} TRX
                  </small>
                </div>
              </div>
              <div className="col-md-3 ml-md-auto d-flex align-items-center">
                <i className="fas fa-hashtag fa-3x mr-3" style={{ width: 50 }}/>
                <div className="lh-100">
                  <h6 className="mb-0 text-white lh-100">
                    {tu("newest_account")}
                  </h6>
                  <small>4948C2E8A756D943703...</small>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="mt-1 bg-white break-word">
              {this.renderAccounts()}
            </div>
              {this.renderPagination()}
          </div>
        </div>
      </main>
    );
  }
}

function mapStateToProps(state) {
  return {
    accounts: state.app.accounts
  };
}

const mapDispatchToProps = {
  loadAccounts
};

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Accounts));
