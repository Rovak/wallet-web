import React, { Component } from 'react';
import ExternalUrlWarning from '../dialogs/ExternalUrlWarning';
import { tu } from "../../utils/i18n";

class ExternalUrl extends Component {
  constructor(props) {
    super(props);

    this.state = { isOpen: false };
  }

  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <React.Fragment>
        <a href="javascript:;" onClick={this.toggleModal}>{this.props.url}</a>

        <ExternalUrlWarning show={this.state.isOpen} url={this.props.url}
          onClose={this.toggleModal}>
        </ExternalUrlWarning>
      </React.Fragment>
    );
  }
}

export default ExternalUrl;
