/* eslint-disable no-undef */
import React from "react";
import {loadTokens} from "../../../actions/tokens";
import {connect} from "react-redux";
import {Link, NavLink, Route, Switch} from "react-router-dom";
import {Client} from "../../../services/api";
import {tu} from "../../../utils/i18n";
import TimeAgoI18N from "../../common/TimeAgoI18N";
import {FormattedDate, FormattedNumber, FormattedTime} from "react-intl";
import {BlockTransactions} from "./Transactions";

class Block extends React.Component {


  constructor({match}) {
    super();

    console.log("match", match);

    this.state = {
      block: {
        number: -1,
        transactions: [],
      },
      transactions: [],
      tabs: [],
    };
  }

  componentDidMount() {
    let {match} = this.props;

    this.loadBlock(match.params.id);
  }

  componentDidUpdate(prevProps) {
    let {match} = this.props;

    if (match.params.id !== prevProps.match.params.id) {
      this.loadBlock(match.params.id);
    }
  }

  async loadBlock(id) {

    let block = await Client.getBlockByNum(id);

    console.log("Block", block);

    let transactions = block.transactions;

    this.setState({
      block,
      transactions,
      tabs: [
        {
          id: "transactions",
          icon: "fa fa-exchange-alt",
          path: "",
          label: <span>{transactions.length} {tu("transactions")}</span>,
          cmp: BlockTransactions,
        },
        // {
        //   id: "comments",
        //   icon: "fa fa-comments",
        //   path: "/comments",
        //   label: tu("comments"),
        //   cmp: BlockComments,
        // },
      ]
    });
  }

  render() {

    let {block, transactions, tabs} = this.state;
    let {activeLanguage, match} = this.props;

    return (
      <main role="main" className="container">
        <div className="row mt-2">
          <div className="col-md-12">
            {
              block.number > 0 && <Link to={"/block/" + (block.number - 1)} className="btn btn-outline-dark">
                <i className="fa fa-arrow-left mr-2"/>
                {tu(("previous"))}
              </Link>
            }
            <Link to={"/block/" + (block.number + 1)} className="btn btn-outline-dark float-right">
              {tu(("next"))}
              <i className="fa fa-arrow-right ml-2"/>
            </Link>
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-md-12 ">
            <div className="card">
              <h5 className="card-header text-center bg-dark text-white">
                <fa className="fa fa-cube mr-2"/>
                {tu("block")} #{block.number}
              </h5>
              <div className="card-body">

              </div>
              <table className="table table-hover bg-white m-0">
                <tbody>
                <tr>
                  <th>{tu("height")}:</th>
                  <td>{block.number}</td>
                </tr>
                {
                  block.time !== 0 && <tr>
                    <th>{tu("time")}:</th>
                    <td>
                      <FormattedDate value={block.time} />&nbsp;
                      <FormattedTime value={block.time} />&nbsp;
                      (<TimeAgoI18N date={block.time} activeLanguage={activeLanguage}/>)
                    </td>
                  </tr>
                }
                <tr>
                  <th>{tu("transactions")}:</th>
                  <td>
                    {transactions.length} {tu("transactions")}
                  </td>
                </tr>
                <tr>
                  <th>{tu("parenthash")}:</th>
                  <td>{block.parentHash}</td>
                </tr>
                {
                  block.witnessAddress !== "" && <tr>
                    <th>{tu("witness")}:</th>
                    <td>
                      {block.witnessAddress}
                    </td>
                  </tr>
                }

                <tr>
                  <th>{tu("size")}:</th>
                  <td>
                    <FormattedNumber value={block.size} />&nbsp;
                    {tu("bytes")}
                  </td>
                </tr>
                </tbody>
              </table>
            </div>

            <div className="card text-center mt-3">
              <div className="card-header">
                <ul className="nav nav-tabs card-header-tabs">
                  {
                    tabs.map(tab => (
                      <li key={tab.id} className="nav-item">
                        <NavLink exact to={match.url + tab.path} className="nav-link text-dark" >
                          <i className={tab.icon + " mr-2"} />
                          {tab.label}
                        </NavLink>
                      </li>
                    ))
                  }
                </ul>
              </div>
              <div className="card-body p-0">
                <Switch>
                  {
                    tabs.map(tab => (
                      <Route key={tab.id} exact path={match.url + tab.path} render={(props) => (<tab.cmp block={block} />)} />
                    ))
                  }
                </Switch>
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
    activeLanguage: state.app.activeLanguage,
  };
}

const mapDispatchToProps = {
  loadTokens,
};

export default connect(mapStateToProps, mapDispatchToProps)(Block);
