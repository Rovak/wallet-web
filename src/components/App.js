import React, {Component} from 'react';
import '../styles/App.scss';
import Navigation from "./Navigation";
import Content from "./Content";
import {HashRouter as Router} from "react-router-dom";
import {Provider} from "react-redux";
import {configureStore} from "../store";
import {IntlProvider} from "react-intl";
import {languages} from "../translations";

class App extends Component {

  constructor() {
    super();
    this.state = {
      loading: true,
      store: configureStore(),
      locale: navigator.language.split(/[-_]/)[0],
    }
  }

  render() {

    let {store, locale} = this.state;

    console.log(languages[locale]);

    return (
      <IntlProvider
        locale={locale}
        messages={languages[locale]}>
        <Provider store={store}>
          <Router>
            <React.Fragment>
              <Navigation/>
              <Content/>
            </React.Fragment>
          </Router>
        </Provider>
      </IntlProvider>
    );
  }
}

export default App;
