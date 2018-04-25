import React, {Component, Fragment} from 'react';
import MediaQuery from "react-responsive";
import ExternalUrl from "../common/ExternalUrl";
import {connect} from "react-redux";
import {loadWitnesses} from "../../actions/network";
import {tu} from "../../utils/i18n";
import {BarLoader} from "../common/loaders";
import {FormattedNumber} from "react-intl";

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

    return (
      <Fragment>
        <MediaQuery minWidth={980}>
          <table className="table table-striped bg-white">
              <thead className="thead-dark">
              <tr>
                <th className="text-right">#</th>
                <th>{tu("name")}</th>
                <th className="text-right">{tu("last_block")}</th>
                <th className="text-right">{tu("blocks_produced")}</th>
                <th className="text-right">{tu("blocks_missed")}</th>
                <th className="text-right">{tu("votes")}</th>
              </tr>
            </thead>
            <tbody>
            {
              witnesses.map((account, index) => (
                <tr key={account.address}>
                  <td className="text-right">{index + 1}</td>
                  <td>
                    <ExternalUrl url={account.url}><span className="text-truncate text-nowrap d-inline-block" style={{maxWidth: 300}}></span></ExternalUrl></td>
                  <td className="text-right"><FormattedNumber value={account.latestBlockNumber} /></td>
                  <td className="text-right"><FormattedNumber value={account.producedTotal} /></td>
                  <td className="text-right"><FormattedNumber value={account.missedTotal} /></td>
                  <td className="text-right"><FormattedNumber value={account.votes} /> TRX</td>
                </tr>
              ))
            }
            </tbody>
          </table>
        </MediaQuery>
        <MediaQuery maxWidth={980}>
          {
            witnesses.map((account, index) => (
              <div className="media small mb-2 text-truncate text-nowrap" key={account.address}>
                <div className="block">
                  #{index}
                </div>
                <div className="media-body mb-0 lh-150">
                  <div className="ml-3">
                    <ExternalUrl url={account.url} index={index}></ExternalUrl>
                  </div>
                  <div className="ml-3 text-muted">
                    {account.votes} TRX
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
