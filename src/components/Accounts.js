import React, {Component} from 'react';
import {connect} from "react-redux";
import {loadAccounts} from "../actions/app";
import {tu} from "../utils/i18n";
import {BarLoader} from "./common/loaders";
import {FormattedNumber, injectIntl} from "react-intl";
import ReactTable from "react-table";
import "react-table/react-table.css";

class Accounts extends Component {

  constructor() {
    super();

    this.state = {
    }
  }

  componentDidMount() {
    this.props.loadAccounts();
  }

  renderAccounts() {

    let {accounts} = this.props;

    if (accounts.length === 0) {
      return (
        <div className="text-center d-flex justify-content-center py-5">
          <BarLoader />
        </div>
      );
    }

    var arr = [];
    
    for (var i = 0; i < accounts.length; i++) {
        let transformed = {
            index: i+1,
            address: accounts[i].address,
            balance: accounts[i].balanceNum
        };
    
        arr.push(transformed);
    }


    return (

      <ReactTable
        data={arr}
        noDataText="Empty"
        filterable
        columns={[{
            Header: () => <strong>#</strong>,
            headerStyle: {backgroundColor: '#2c2c2c', color:'#ffffff', cursor: "pointer", textAlign: "left", paddingLeft : 10},
            accessor: 'index',
            maxWidth: 100,
            style: {
              textAlign: "left",
              paddingLeft : 10
            },
            Cell: row => (<strong>{row.value}</strong>)
          }, {
            Header: () => <strong>{tu("address")}</strong>,
            headerStyle: {backgroundColor: '#2c2c2c', color:'#ffffff', cursor: "pointer", textAlign: "left"},
            accessor: 'address',
            minWidth: 200,
            style: {
              textAlign: "left"
            },
          }, {
            Header: () => <strong>{tu("balance")}</strong>,
            headerStyle: {backgroundColor: '#2c2c2c', color:'#ffffff', cursor: "pointer", textAlign: "right"},
            accessor: 'balance',
            maxWidth: 200,
            style: {
              textAlign: "right"
            },
            Cell:  row => (new Intl.NumberFormat('gb-GB', { style: 'currency', currency: 'TRX' }).format(row.value))
          },
        ]}
        defaultPageSize={20}
        className="-striped -highlight"
      />
    )
  }

  render() {

    let {accounts, intl} = this.props;
    let {searchString} = this.state;

    return (
      <main role="main" className="container mt-3">
        <div className="row">
          <div className="col-md-12">
            <div className="p-3 my-3 text-white-50 bg-dark rounded row no-gutters">
              <div className="col-md-3 d-flex align-items-center mb-3 mb-md-0">
                <i className="fas fa-piggy-bank fa-3x mr-3" style={{width: 50}}/>
                <div className="lh-100">
                  <h6 className="mb-0 text-white lh-100">{tu("accounts")}</h6>
                  <small><FormattedNumber value={accounts.length}/></small>
                </div>
              </div>
              <div className="col-md-3 ml-md-auto d-flex align-items-center mb-3 mb-md-0">
                <i className="fas fa-trophy fa-3x mr-3" style={{width: 50}}/>
                <div className="lh-100">
                  <h6 className="mb-0 text-white lh-100">{tu("most_trx")}</h6>
                  <small>{accounts[0] && <FormattedNumber value={accounts[0].balanceNum}/>} TRX</small>
                </div>
              </div>
              <div className="col-md-3 ml-md-auto d-flex align-items-center">
                <i className="fas fa-hashtag fa-3x mr-3" style={{width: 50}}/>
                <div className="lh-100">
                  <h6 className="mb-0 text-white lh-100">{tu("newest_account")}</h6>
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


export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Accounts))
