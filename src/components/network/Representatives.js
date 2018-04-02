import React, {Component, Fragment} from 'react';
import MediaQuery from "react-responsive";
import {connect} from "react-redux";
import {loadWitnesses} from "../../actions/network";
import {BarLoader} from "react-spinners";
import {tu} from "../../utils/i18n";

class Representatives extends Component {

  componentDidMount() {
    this.props.loadWitnesses();
  }

  renderWitnesses() {

    let {witnesses} = this.props;

    if (witnesses.length === 0) {
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
              <th scope="col">{tu("address")}</th>
              <th scope="col">{tu("votes")}</th>
            </tr>
            </thead>
            <tbody>
            {
              witnesses.map((account, index) => (
                <tr key={account.address}>
                  <th scope="row">{index}</th>
                  <td>{account.address.toUpperCase()}</td>
                  <td>{account.votes} TRX</td>
                </tr>
              ))
            }
            </tbody>
          </table>
        </MediaQuery>
        <MediaQuery maxWidth={980}>
          {
            witnesses.map((account, index) => (
              <div className="media small mb-2" key={account.address}>
                <div className="block">
                  #{index}
                </div>
                <div className="media-body mb-0 lh-150">
                  <div className="ml-3">
                    {account.address.toUpperCase()}
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
            <div className="my-3 p-3 bg-white rounded box-shadow">
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
