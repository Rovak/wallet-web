import React, { Component } from 'react';
import '../styles/App.scss';
import Navigation from "./Navigation";
import Content from "./Content";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {


  render() {
    return (
      <Router>
        <React.Fragment>

          <Navigation/>

          <Content/>

        </React.Fragment>

      </Router>

    );
  }
}

export default App;
