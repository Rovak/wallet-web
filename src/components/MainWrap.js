import {loadAccounts, setLanguage} from "../actions/app";
import {connect} from "react-redux";
import React from "react";
import Navigation from "./Navigation";
import Content from "./Content";
import {IntlProvider} from "react-intl";
import {languages} from "../translations";
import {HashRouter as Router} from "react-router-dom";
import Lockr from "lockr";
import Footer from "./Footer";

class MainWrap extends React.Component {

  componentDidMount() {
    // Use language from local storage or detect from browser settings
    let language = Lockr.get("language", navigator.language.split(/[-_]/)[0]);
    this.props.setLanguage(language);
  }

  render() {

    let {activeLanguage} = this.props;

    return (
      <React.Fragment>
        <IntlProvider
          locale={activeLanguage}
          messages={languages[activeLanguage]}>
          <Router>
            <React.Fragment>
              <Navigation/>
              <Content/>
              <Footer/>
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
