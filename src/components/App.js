import React, {Component} from 'react';
import {Provider} from "react-redux";
import {configureStore} from "../store";
import MainWrap from "./MainWrap";

class App extends Component {

  constructor() {
    super();
    this.state = {
      loading: true,
      store: configureStore(),
    };
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
