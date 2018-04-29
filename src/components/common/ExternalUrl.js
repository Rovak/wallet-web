import React, { Component } from "react";
import ExternalUrlWarning from "../dialogs/ExternalUrlWarning";

class ExternalUrl extends Component {
  constructor(props) {
    super(props);

    this.state = { isOpen: false };
  }

  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    return (
      <React.Fragment>
        <a
          href={this.props.url}
          onClick={e => {
            e.preventDefault();
            this.toggleModal();
          }}
        >
          {this.props.url}
        </a>

        <ExternalUrlWarning
          show={this.state.isOpen}
          url={this.props.url}
          onClose={this.toggleModal}
        />
      </React.Fragment>
    );
  }
}

export default ExternalUrl;
