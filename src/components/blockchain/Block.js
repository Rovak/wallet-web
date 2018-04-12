/* eslint-disable no-undef */
import React from "react";
import {loadTokens} from "../../actions/tokens";
import {connect} from "react-redux";
import {random, range} from "lodash";
import {Link} from "react-router-dom";

class Block extends React.Component {

  componentDidUpdate() {

  }

  render() {

    let {block} = this.props;

    return (
      <main role="main" className="container">
        <div className="row mt-2">
          <div className="col-md-12">

            <Link to="/block/1" className="btn btn-outline-dark">
              <i className="fa fa-arrow-left mr-2"/>
              Previous
            </Link>

            <Link to="/block/2" className="btn btn-outline-dark float-right">
              Next
              <i className="fa fa-arrow-right ml-2"/>
            </Link>
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-md-12 ">
            <div className="card">
              <h5 class="card-header text-center">
                <fa className="fa fa-cube mr-2"/>
                Block #8973
              </h5>
              <div className="card-body">

              </div>
              <table className="table table-hover bg-white m-0">
                <tbody>
                <tr>
                  <th>Hash:</th>
                  <td>0xe7c1c6aa8955d4defe0d07205317aab33ed0779703abb178f7661817506bf303</td>
                </tr>
                <tr>
                  <th>Difficulty:</th>
                  <td>3,141,217,261,145,241</td>
                </tr>
                <tr>
                  <th>Miner:</th>
                  <td><a href="/account/52bc44d5378309ee2abf1539bf71de1b7d7be3b5">✔ Nanopool (0x52bc...)</a> (Mined in
                    4s)
                  </td>
                </tr>
                <tr>
                  <th>Reward:</th>
                  <td>3.00298 ETH | &nbsp;<abbr class="initialism" title="Click to see the historic value"
                                               >$1,394.37</abbr> (Block Reward:
                    3 ETH + Fee Reward: 0.00298 ETH + Uncle Inclusion Reward: 0 ETH)
                  </td>
                </tr>
                <tr>
                  <th>Tx Fees:</th>
                  <td>0.00298 ETH | &nbsp;<abbr class="initialism" title="Click to see the historic value"
                                                >$1.38</abbr> (0.1% of the total
                    block reward)
                  </td>
                </tr>
                <tr>
                  <th>Tx / Uncles:</th>
                  <td>19 Transactions and 0 Uncles</td>
                </tr>
                <tr>
                  <th>Gas Limit:</th>
                  <td>8,000,029</td>
                </tr>
                <tr>
                  <th>Gas Usage:</th>
                  <td>13.4 % (1,073,598 of 8,000,029)</td>
                </tr>
                <tr>
                  <th>Lowest Gas Price:</th>
                  <td>1 GWei</td>
                </tr>
                <tr>
                  <th>Time:</th>
                  <td><span aria-ethereum-date="1523567078">04/12/2018 11:04:38 PM</span> (2 minutes ago)</td>
                </tr>
                <tr>
                  <th>Size:</th>
                  <td>3,347 bytes</td>
                </tr>
                <tr>
                  <th>Extra</th>
                  <td>nanopool.org (Raw: 0x6e616e6f706f6f6c2e6f7267)</td>
                </tr>
                </tbody>
              </table>
              <div className="card-footer text-muted">

              </div>
            </div>

            <div className="card text-center mt-3">
              <div className="card-header">
                <ul className="nav nav-tabs card-header-tabs">
                  <li className="nav-item">
                    <a className="nav-link active" href="#">
                      <i className="fa fa-exchange-alt mr-2"/>
                      Transactions
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link text-muted" href="#">
                      <i className="fa fa-file-alt mr-2"/>
                      Details
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link text-muted" href="#">
                      <i className="fa fa-comments mr-2"/>
                      Comments
                    </a>
                  </li>
                </ul>
              </div>
              <div className="card-body">

              </div>
            </div>
          </div>
        </div>
      </main>
    )
  }

}


function mapStateToProps(state) {

  let block = {};

  return {
    block,
  };
}

const mapDispatchToProps = {
  loadTokens,
};

export default connect(mapStateToProps, mapDispatchToProps)(Block);
