import React, {Component} from 'react';
import {connect} from "react-redux";
import {loadTokens} from "../../actions/tokens";
import {sumBy} from "lodash";
import {FormattedDate, FormattedTime} from "react-intl";
import {tu} from "../../utils/i18n";

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
          <th scope="col">{tu("name")}</th>
          <th scope="col">{tu("issuer")}</th>
          <th scope="col">{tu("total_supply")}</th>
          <th scope="col">{tu("start_end_time")}</th>
        </tr>
        </thead>
        <tbody>
        {
          tokens.map((token, index) => (
            <tr key={token.name}>
              <td>{token.name}</td>
              <td>{token.ownerAddress}</td>
              <td>{token.totalSupply}</td>
              <td>
                <FormattedDate value={token.startTime}/>&nbsp;
                <FormattedTime value={token.startTime}/>&nbsp;
                -&nbsp;
                <FormattedDate value={token.endTime}/>&nbsp;
                <FormattedTime value={token.endTime}/>
              </td>
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
