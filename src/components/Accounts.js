import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {loadAccounts} from "../actions/app";
import MediaQuery from 'react-responsive';
import {BarLoader} from "react-spinners";

class Accounts extends Component {

  componentDidMount() {
    this.props.loadAccounts();
  }

  renderAccounts() {

    let {accounts} = this.props;

    if (accounts.length === 0) {
      return (
        <div className="text-center d-flex justify-content-center">
          <BarLoader color={'#343a40'} loading={true} height={5} width={150} />
        </div>
      );
    }

    return (
      <Fragment>
        <MediaQuery minWidth={980}>
          <table className="table">
            <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Address</th>
              <th scope="col">Balance</th>
            </tr>
            </thead>
            <tbody>
            {
              accounts.map((account, index) => (
                <tr>
                  <th scope="row">{index}</th>
                  <td>{account.address}</td>
                  <td>{account.balanceNum} TRX</td>
                </tr>
              ))
            }
            </tbody>
          </table>
        </MediaQuery>
        <MediaQuery maxWidth={980}>
          {
            accounts.map((account, index) => (
              <div className="media small mb-2">
                <div className="block">
                  #{index}
                </div>
                <div className="media-body mb-0 lh-150">
                  <div className="ml-3">
                    {account.address.toUpperCase()}
                  </div>
                  <div className="ml-3 text-muted">
                    {account.balanceNum} TRX
                  </div>
                </div>
              </div>
            ))
          }

        </MediaQuery>
      </Fragment>
    )
  }

  render() {

    let {accounts} = this.props;

    return (
      <main role="main" className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="p-3 my-3 text-white-50 bg-dark rounded box-shadow row no-gutters">
              <div className="col-md-3 d-flex align-items-center mb-3 mb-md-0">
                <i className="fas fa-piggy-bank fa-3x mr-3" style={{width: 50}}/>
                <div className="lh-100">
                  <h6 className="mb-0 text-white lh-100">Accounts</h6>
                  <small>{accounts.length}</small>
                </div>
              </div>
              <div className="col-md-3 ml-md-auto d-flex align-items-center mb-3 mb-md-0">
                <i className="fas fa-trophy fa-3x mr-3" style={{width: 50}}/>
                <div className="lh-100">
                  <h6 className="mb-0 text-white lh-100">Most TRX</h6>
                  <small>{accounts[0] && accounts[0].balanceNum} TRX</small>
                </div>
              </div>
              <div className="col-md-3 ml-md-auto d-flex align-items-center">
                <i className="fas fa-hashtag fa-3x mr-3" style={{width: 50}}/>
                <div className="lh-100">
                  <h6 className="mb-0 text-white lh-100">Newest Account</h6>
                  <small>4948C2E8A756D943703...</small>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="my-3 p-3 bg-white rounded box-shadow">
              {this.renderAccounts()}
            </div>
          </div>
        </div>
      </main>
    )
  }
}



function mapStateToProps(state) {
  return {
    accounts: state.app.accounts,
  };
}

const mapDispatchToProps = {
  loadAccounts,
};


export default connect(mapStateToProps, mapDispatchToProps)(Accounts)
