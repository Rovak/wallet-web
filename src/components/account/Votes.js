import React, {Component} from 'react';
import {connect} from "react-redux";
import {tu} from "../../utils/i18n";
import {filter, find, sumBy} from "lodash";
import {loadWitnesses} from "../../actions/network";
import {Client} from "../../services/api";
import {injectIntl} from "react-intl";
import {loadTokenBalances} from "../../actions/account";
import {Sticky, StickyContainer} from "react-sticky";
import MediaQuery from "react-responsive";
import {Alert} from "reactstrap";
import {Redirect} from "react-router-dom";


class Votes extends Component {

  constructor() {
    super();

    this.state = {
      votes: {},
      votesSubmitted: false,
      searchString: "",
    };
  }

  componentDidMount() {
    let {account, loadWitnesses, loadTokenBalances} = this.props;
    if (!account.isLoggedIn) {
      return <Redirect to="/login" />;
    }
    loadWitnesses();
    if(account.isLoggedIn)
    loadTokenBalances(account.address);
  }

  setVote = (address, numberOfVotes) => {
    let {votes} = this.state;

    if (numberOfVotes !== "") {
      numberOfVotes = parseInt(numberOfVotes, 10);

      if (numberOfVotes < 0) {
        numberOfVotes = 0;
      }
    }

    votes[address] = numberOfVotes;

    this.setState({
      votes,
    });
  };

  voteForWitnesses = async () => {
    let {account} = this.props;
    let {votes} = this.state;

    let witnessVotes = Object.keys(votes).map(address => ({
      address,
      amount: parseInt(votes[address], 10),
    }));

    witnessVotes = filter(witnessVotes, vote => vote.amount > 0);

    await Client.voteForWitnesses(account.key, witnessVotes);

    this.setState({
      votesSubmitted: true,
    });

  };

 /* hasVotes = () => {
    let voteStatus = this.getVoteStatus();

    return voteStatus.votesSpend > 0 && voteStatus.votesAvailable >= 0;
  };
*/
  onSearchFieldChangeHandler = (e) => {
    this.setState({
      searchString: e.target.value,
    })
  };


  filteredWitnesses() {
    let {witnesses} = this.props;
    let {searchString} = this.state;

    searchString = searchString.toUpperCase();

    if (searchString.length > 0) {
      witnesses = filter(
        witnesses, w =>
          w.address.toUpperCase().indexOf(searchString) !== -1 ||
          w.url.toUpperCase().indexOf(searchString) !== -1);
    }

    return witnesses;
  }

  getVoteStatus() {
    let {tokenBalances} = this.props;
    let {votes} = this.state;

    let trx = find(tokenBalances, tb => tb.name.toUpperCase() === "TRX");
    let trxBalance = trx ? trx.balance : 0;

    let votesSpend = sumBy(Object.values(votes), vote => parseInt(vote, 10) || 0);

    let votesAvailable = trxBalance - votesSpend;
    let spendAll = (votesSpend > 0 && votesAvailable === 0);

    let voteState = 0;

    if (votesAvailable > 0) {
      voteState = 1;
    } else if (votesAvailable < 0) {
      voteState = -1;
    }

    if (trxBalance === 0) {
      voteState = -1;
    }

    return {
      trxBalance,
      votesSpend,
      votesAvailable,
      spendAll,
      voteState,
      votePercentage: (votesSpend / trxBalance) * 100,
    };
  }
  returnVate(){
      this.setState({
          votesSubmitted: false,
          votes: {},
      });

  }

  render() {

    let { account } = this.props;
    if (!account.isLoggedIn) {
      return <Redirect to="/login" />;
    }

    let {intl} = this.props;

    let {votesSubmitted, searchString, votes} = this.state;

    let witnesses = this.filteredWitnesses();
    let voteStatus = this.getVoteStatus();

    if (votesSubmitted) {
      return (
        <main className="container pt-5 pb-5">
          <div className="row">
            <div className="col-md-12">
              <Alert color="success" className="text-center">
                {tu("vote_thanks")}
                <br/>
                <br/>
                <button className="btn btn-primary btn-sm" onClick={this.returnVate.bind(this)}>
                    {tu("return_vate")}
                </button>
              </Alert>
            </div>
          </div>
        </main>
      );
    }

    const VoteCard = ({className = ""}) => (
      <div className={"card " + className}>
        <div className="card-header text-center bg-dark text-white">
          {tu("vote")}
        </div>
        <div className="card-body">
          {
            voteStatus.voteState === 1 &&
            <p className="text-center">
              {voteStatus.votesAvailable} TRX {tu("remaining")}
            </p>
          }
          {
            (voteStatus.voteState === -1 || voteStatus.voteState === 0) &&
            <p className="text-center">
              {tu("no_trx_remaining")}
            </p>
          }
          <div className="progress">
            <div
              className={
                "progress-bar" +
                (voteStatus.voteState === 0 ? " bg-success" : "") +
                (voteStatus.voteState === -1 ? " bg-danger" : "")
              }
              style={{width: voteStatus.votePercentage + '%'}} />
          </div>
          {
            (voteStatus.voteState === 1 || voteStatus.voteState === 0) &&
            <button className="btn btn-success col-md mt-3"
                    onClick={this.voteForWitnesses}
                    disabled={voteStatus.votesSpend === 0 || voteStatus.voteState === -1}>
              {tu("submit_votes")}
            </button>
          }
          {
            (voteStatus.voteState === -1) &&
            <button className="btn btn-danger col-md mt-3"
                    onClick={this.voteForWitnesses}
                    disabled={voteStatus.votesSpend === 0 || voteStatus.voteState === -1}>
              {tu("too_many_votes")}
            </button>
          }
          <p className="mt-3">
            {tu("vote_guide_message")}
          </p>
        </div>
      </div>
    );

    return (
      <main className="container mt-3">
        <div className="row">
          <div className="col-md-12">
            <p>
              <input type="text"
                     placeholder={intl.formatMessage({id: "search_address_or_url"})}
                     onChange={this.onSearchFieldChangeHandler}
                     className="form-control"
                     value={searchString}/>
            </p>
          </div>
        </div>
        <StickyContainer className="row">
          <div className="col-md-8">
            <div>

            </div>
            <div className="card">
              <div className="card-header text-center bg-dark text-white">
                {tu("candidates")}
              </div>
              <div className="card-body p-0">
                <table className="table table-striped bg-white">
                  <thead className="thead-dark">
                  <tr>
                    <th style={{width: 25}}>#</th>
                    <th>{tu("address")}</th>
                    <th>{tu("votes")}</th>
                    <th className="text-center" style={{width: 120}}>{tu("my_vote")}</th>
                  </tr>
                  </thead>
                  <tbody>
                  {
                    witnesses.map((account, index) => (
                      <tr key={account.address}>
                        <th scope="row">{index + 1}</th>
                        <td className="break-word">
                          {account.address.substr(0, 24)}...<br/>
                          <small>{account.url}</small>
                        </td>
                        <td>{account.votes} TRX</td>
                        <td>
                          <input onChange={(ev) => this.setVote(account.address, ev.target.value)}
                                 value={votes[account.address]}
                                 className="form-control form-control-sm text-center"
                                 placeholder="0"
                                 type="number"/>
                        </td>
                      </tr>
                    ))
                  }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <MediaQuery minWidth={768}>
              <Sticky>
                {
                  ({ style, isSticky }) => <div style={{...style, top: isSticky ? style.top + 25 : 0}}>
                    <VoteCard/>
                  </div>
                }
              </Sticky>
            </MediaQuery>
            <MediaQuery maxWidth={768}>
              <VoteCard className="mt-3" />
            </MediaQuery>
          </div>
        </StickyContainer>
      </main>
    )
  }
}


function mapStateToProps(state) {
  return {
    account: state.app.account,
    tokenBalances: state.account.tokens,
    witnesses: state.network.witnesses,
  };
}

const mapDispatchToProps = {
  loadWitnesses,
  loadTokenBalances
};

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Votes))

