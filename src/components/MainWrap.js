import {loadAccounts, setLanguage} from "../actions/app";
import {connect} from "react-redux";
import React from "react";
import Navigation from "./Navigation";
import Content from "./Content";
import {IntlProvider} from "react-intl";
import {languages} from "../translations";
import {HashRouter as Router} from "react-router-dom";


class MainWrap extends React.Component {

  render() {

    let {activeLanguage} = this.props;

    return (
      <React.Fragment>

        <IntlProvider
          locale={activeLanguage}
          messages={languages[activeLanguage]}>
        <Router>
            <React.Fragment>
              <Navigation />
              <Content/>
            </React.Fragment>
          </Router>
        </IntlProvider>
      </React.Fragment>
    )
  }
}

function mapStateToProps(state) {
  return {
    activeLanguage: state.app.activeLanguage,
    availableLanguages: state.app.availableLanguages,
    account: state.app.account,
  };
}

const mapDispatchToProps = {
  loadAccounts,
  setLanguage
};

export default connect(mapStateToProps, mapDispatchToProps)(MainWrap)
