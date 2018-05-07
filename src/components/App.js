import React, {Component} from 'react';
import {Provider} from "react-redux";
import {configureStore} from "../store";
import MainWrap from "./MainWrap";
import Lockr from "lockr";
import {loginWithPassword} from "../actions/app";

class App extends Component {

  constructor() {
    super();
    this.state = {
      loading: true,
      store: configureStore(),
    };
  }

  componentDidMount() {
    let {store} = this.state;
    let privateKey = Lockr.get("account_key");

    if (typeof privateKey !== "undefined" && (privateKey === privateKey.toUpperCase())) {
      store.dispatch(loginWithPassword(privateKey));
    }
  }

  render() {

    let {store} = this.state;

    return (
      <Provider store={store}>
        <MainWrap />
      </Provider>
    );
  }
}

export default App;
