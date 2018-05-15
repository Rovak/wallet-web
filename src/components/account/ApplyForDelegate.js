import React, {Component} from 'react';
import {connect} from "react-redux";
import {t, tu} from "../../utils/i18n";
import {Redirect} from "react-router-dom";
import {Client} from "../../services/api";

class ApplyForDelegate extends Component {

  constructor() {
    super();

    this.state = {
      url: "",
      check: false,
      applyResponse: null,
      loading: false,
    };
  }

  isValid = () => {
    let {url, check} = this.state;
    return url.length > 0 && check;
  };

  doApply = async () => {
    let {account} = this.props;
    let {url} = this.state;

    this.setState({ loading: true, });

    let isValid = await Client.applyForDelegate(account.key, url);

    this.setState({
      applyResponse: isValid,
      loading: false,
    });
  };

  renderFooter() {
    let {applyResponse, loading} = this.state;

    if (applyResponse === true ){
      return (
        <div className="alert alert-success text-center">
          {tu("thanks_for_applying")}
        </div>
      )
    }

    if (applyResponse === false) {
      return (
        <div className="alert alert-danger text-center">
          {tu("unknown_error")}
        </div>
      );
    }

    return (
      <p className="text-center">
        <button
          disabled={!this.isValid() || loading}
          className="btn btn-success"
          onClick={this.doApply}>{tu("submit")}</button>
      </p>
    );
  }

  render() {
      
    let {account} = this.props;
    if (!account.isLoggedIn) {
      return <Redirect to="/login" />;
    } 

    return (
      <main className="container pt-5 pb-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header text-center bg-dark text-white">
                {tu("apply_for_delegate")}
              </div>
              <div className="card-body">
                <p className="card-text">
                  {t("apply_for_delegate_description")}
                </p>
                <hr/>
                <p className="mt-5 text-center">
                  <label>{tu("your_personal_website_address")}</label>
                  <input className="form-control text-center"
                         type="text"
                          placeholder="http://"
                         onChange={(ev) => this.setState({ url: ev.target.value })}/>
                </p>
                <div className="text-center">
                  <div className="form-check">
                    <input type="checkbox"
                           className="form-check-input" onChange={(ev) => this.setState({ check: ev.target.checked })} />
                    <label className="form-check-label">
                      {tu("representative_understand")}
                    </label>
                  </div>
                </div>
                <div className="pt-3">
                  {this.renderFooter()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    )
  }
}

function mapStateToProps(state) {
  return {
    account: state.app.account,
  };
}

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(ApplyForDelegate)

