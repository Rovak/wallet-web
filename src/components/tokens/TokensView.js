import React, {Component} from 'react';
import {connect} from "react-redux";
import {loadTokens} from "../../actions/tokens";
import {sumBy} from "lodash";

class TokensView extends Component {

  componentDidMount() {
    this.props.loadTokens();
  }

  renderTable() {
    let {tokens} = this.props;

    return (
      <table className="table">
        <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Issuer</th>
          <th scope="col">Total Supply</th>
          <th scope="col">Start/End Time</th>
        </tr>
        </thead>
        <tbody>
        {
          tokens.map((token, index) => (
            <tr key={token.name}>
              <td>{token.name}</td>
              <td>{token.ownerAddress}</td>
              <td>{token.totalSupply}</td>
              <td>{token.startTime} - {token.endTime}</td>
            </tr>
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
  };
}

const mapDispatchToProps = {
  loadTokens,
};

export default connect(mapStateToProps, mapDispatchToProps)(TokensView);
