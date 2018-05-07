import React, {Component} from 'react';
import ExternalUrl from "../common/ExternalUrl";
import {connect} from "react-redux";
import {loadWitnesses} from "../../actions/network";
import {tu} from "../../utils/i18n";
import {BarLoader} from "../common/loaders";
import {FormattedNumber} from "react-intl";
import ReactTable from "react-table";
import "react-table/react-table.css";

class Representatives extends Component {

  componentDidMount() {
    this.props.loadWitnesses();
  }

  renderWitnesses() {

    let {witnesses} = this.props;

    if (witnesses.length === 0) {
      return (
        <div className="text-center d-flex justify-content-center p-4">
          <BarLoader />
        </div>
      );
    }

    var arr = [];
    
    for (var i = 0; i < witnesses.length; i++) {
        let transformed = {
            index: i+1,
            address: witnesses[i].address,
            url: witnesses[i].url,
            latestBlockNumber: witnesses[i].latestBlockNumber,
            producedTotal: witnesses[i].producedTotal,
            missedTotal: witnesses[i].missedTotal,
            votes: witnesses[i].votes
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
            headerStyle: {backgroundColor: '#2c2c2c', color:'#ffffff', cursor: "pointer", textAlign: "center", paddingLeft : 10},
            accessor: 'index',
            maxWidth: 50,
            style: {
              textAlign: "center",
              paddingLeft : 10
            },
            Cell: row => (<strong>{row.value}</strong>)
          }, {
            Header: () => <strong>{tu("name")}</strong>,
            headerStyle: {backgroundColor: '#2c2c2c', color:'#ffffff', cursor: "pointer", textAlign: "left"},
            accessor: 'url',
            Width: 300,
            maxWidth: 400,
            style: {
              textAlign: "left"
            },
            Cell : row => (<ExternalUrl url={row.value}><span className="text-truncate text-nowrap d-inline-block"></span></ExternalUrl>)
          }, {
            Header: () => <strong>{tu("last_block")}</strong>,
            headerStyle: {backgroundColor: '#2c2c2c', color:'#ffffff', cursor: "pointer", textAlign: "right"},
            accessor: 'latestBlockNumber',
            width: 175,
            style: {
              textAlign: "right"
            },
            Cell:  row => (new Intl.NumberFormat().format(row.value))
          }, {
            Header: () => <strong>{tu("blocks_produced")}</strong>,
            headerStyle: {backgroundColor: '#2c2c2c', color:'#ffffff', cursor: "pointer", textAlign: "right"},
            accessor: 'producedTotal',
            width: 175,
            style: {
              textAlign: "right"
            },
            Cell:  row => (new Intl.NumberFormat().format(row.value))
          }, {
            Header: () => <strong>{tu("blocks_missed")}</strong>,
            headerStyle: {backgroundColor: '#2c2c2c', color:'#ffffff', cursor: "pointer", textAlign: "right"},
            accessor: 'missedTotal',
            width: 175,
            maxWidth: 150,
            style: {
              textAlign: "right"
            },
            Cell:  row => (new Intl.NumberFormat().format(row.value))
          }, {
            Header: () => <strong>{tu("votes")}</strong>,
            headerStyle: {backgroundColor: '#2c2c2c', color:'#ffffff', cursor: "pointer", textAlign: "right"},
            accessor: 'votes',
            width: 200,
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

    let {witnesses} = this.props;

    return (
      <main role="main" className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="p-3 my-3 text-white-50 bg-dark rounded box-shadow row no-gutters">
              <div className="col-md-3 d-flex align-items-center mb-3 mb-md-0">
                <i className="fas fa-users fa-3x mr-3" style={{width: 50}}/>
                <div className="lh-100">
                  <h6 className="mb-0 text-white lh-100">{tu("representatives")}</h6>
                  <small>{witnesses.length}</small>
                </div>
              </div>
              <div className="col-md-3 ml-md-auto d-flex align-items-center mb-3 mb-md-0">
                <i className="fas fa-trophy fa-3x mr-3" style={{width: 50}}/>
                <div className="lh-100">
                  <h6 className="mb-0 text-white lh-100">{tu("most_votes")}</h6>
                  <small>{witnesses[0] && witnesses[0].votes} TRX</small>
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
            <div className="box-shadow">
              {this.renderWitnesses()}
            </div>
          </div>
        </div>
      </main>
    )
  }
}

function mapStateToProps(state) {
  return {
    witnesses: state.network.witnesses,
  };
}

const mapDispatchToProps = {
  loadWitnesses,
};

export default connect(mapStateToProps, mapDispatchToProps)(Representatives)
