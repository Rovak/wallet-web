/* eslint-disable no-undef */
import React from "react";
import {tu} from "../../utils/i18n";
import {loadTokens} from "../../actions/tokens";
import {connect} from "react-redux";
import {range, random} from "lodash";
import TimeAgo from "react-timeago";
import {FormattedNumber} from "react-intl";
import {Link} from "react-router-dom";

class Blocks extends React.Component {

  constructor() {
    super();

    this.state = {
    };
  }

  componentDidUpdate() {

  }

  render() {

    let {blocks} = this.props;

    return (
      <main role="main" className="container">
        <div className="row">
          <div className="col-md-12 mt-1 ">
            <div className="card mt-1">
              <div className="card-body">
                Showing Block (#5428906 to #5428882) out of 5428907 total blocks
              </div>
              <table className="table table-sm table-hover bg-white m-0">
                <thead className="thead-light">
                <tr>
                  <th style={{width: 25 }}>#</th>
                  <th style={{width: 125 }}>{tu("created")}</th>
                  <th style={{width: 25}}><i className="fas fa-exchange-alt"/></th>
                  <th style={{width: 125 }}>{tu("produced by")}</th>
                  <th className="text-right">{tu("balance")}</th>
                </tr>
                </thead>
                <tbody>
                {
                  blocks.map((block, index) => (
                    <tr key={block.address}>
                      <th>
                        <Link to={`/block/${index + 1}`}>{index + 1}</Link>
                      </th>
                      <td><TimeAgo date={block.dateCreated} /></td>
                      <td className="text-right"><FormattedNumber value={block.transactions} /></td>
                      <td>{block.producedBy}</td>
                      <td className="text-right">
                        100 TRX
                      </td>
                    </tr>
                  ))
                }
                </tbody>
              </table>
              <div className="card-footer text-muted">

              </div>
            </div>
          </div>
        </div>
      </main>
    )
  }

}





function mapStateToProps(state) {

  let blocks = [];

  for (let i of range(1, 25)) {
    blocks.push({
      dateCreated: (new Date().getTime()) - (i * 13000),
      transactions: random(25, 250),
      producedBy: "A08BEAA1A8E2D45367AF7BAE7C490B9932A4FA4301",
    });
  }


  return {
    blocks,
  };
}

const mapDispatchToProps = {
  loadTokens,
};

export default connect(mapStateToProps, mapDispatchToProps)(Blocks);
