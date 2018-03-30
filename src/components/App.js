import React, { Component } from 'react';
import '../styles/App.scss';
import Navigation from "./Navigation";
import Content from "./Content";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {Provider} from "react-redux";
import {configureStore} from "../store";

class App extends Component {

  constructor() {
    super();
    this.state = {
      loading: true,
      store: configureStore(),
    }
  }

  render() {

    let {store} = this.state;

    return (
      <Provider store={store}>
        <Router basename="/wallet-web">
          <React.Fragment>
            <Navigation/>
            <Content/>
          </React.Fragment>
        </Router>
      </Provider>
    );
  }
}

export default App;
