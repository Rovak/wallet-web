import React, {Component} from 'react';
import {connect} from "react-redux";
import {t, tu} from "../../utils/i18n";
import {some} from "lodash";
import {loadWitnesses} from "../../actions/network";
import {Client} from "../../services/api";
import {passwordToAddress} from "@tronprotocol/wallet-api/src/utils/crypto";

class Votes extends Component {

  constructor() {
    super();

    this.state = {
      votes: {},
      votesSubmitted: false,
	  searchString:"",
    };
  }

  componentDidMount() {
    this.props.loadWitnesses();
  }

  setVote = (address, numberOfVotes) => {
    let {votes} = this.state;
    votes[address] = numberOfVotes;

    this.setState({
      votes,
    });
  };

  voteForWitnesses = () => {
    let {account} = this.props;
    let {votes} = this.state;

    let witnessVotes = Object.keys(votes).map(address => ({
      address,
      amount: votes[address],
    }));

    Client.voteForWitnesses(passwordToAddress(account.key), witnessVotes);

    this.setState({
      votesSubmitted: true,
    })
  };

  hasVotes = () => {
    return some(Object.values(this.state.votes), votes => votes > 0);
  };
  
  onSearchFieldChangeHandler(e){
	this.setState({
		searchString: e.target.value,
		})
	};
 
  render() {

    let {witnesses} = this.props;
    let {votesSubmitted} = this.state;

    if (votesSubmitted) {
      return (
        <main className="container pt-5 pb-5">
          <div className="row">
            <div className="col-md-12">
              <div className="alert alert-success" role="alert">
                {tu("vote_thanks")}
              </div>
            </div>
          </div>
        </main>
      );
    }

    return (
      <main className="container mt-3">
        <div className="row">
          <div className="col-md-12">
			<div>
			<p>
				<input type="text" placeholder="Search for address or URL"
                   onChange={this.onSearchFieldChangeHandler.bind(this)}
                   className="form-control"
                   value={this.state.searchString} />
			</p>
			</div>
            <table className="table table-striped bg-white">
              <thead className="thead-dark">
              <tr>
                <th style={{width: 25}}>#</th>
                <th>{tu("address")}</th>
                <th>{tu("url")}</th>
                <th>{tu("votes")}</th>
                <th style={{width: 120}}>{tu("my_vote")}</th>
              </tr>
              </thead>
              <tbody>
              {
                witnesses.filter(account => this.state.searchString == "" || 
				(account.address.indexOf(this.state.searchString)!=-1)||
				(account.url.toLowerCase().indexOf(this.state.searchString.toLowerCase())!=-1))
				.map((account, index) => (
                  <tr key={account.address}>
                    <th scope="row">{index + 1}</th>
                    <td>{account.address.toUpperCase()}</td>
                    <td>{account.url}</td>
                    <td>{account.votes} TRX</td>
                    <td>
                      <input onChange={(ev) => this.setVote(account.address, ev.target.value)}
                             className="form-control form-control-sm text-center"
                             placeholder="0"
                             type="number" />
                    </td>
                  </tr>
                ))
              }
              </tbody>
            </table>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <button className="btn btn-success col-md text-uppercase"
                    onClick={this.voteForWitnesses}
                    disabled={!this.hasVotes()}>
              {t("submit_votes")}
              </button>
          </div>
        </div>
      </main>
    )
  }
}


function mapStateToProps(state) {
  return {
    account: state.app.account,
    witnesses: state.network.witnesses,
  };
}

const mapDispatchToProps = {
  loadWitnesses,
};

export default connect(mapStateToProps, mapDispatchToProps)(Votes)

