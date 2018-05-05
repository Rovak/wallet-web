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
      const url = this.props.url.length>30?this.props.url.substring(0,30)+'...':this.props.url
    return (
      <React.Fragment>
        <a
          href={this.props.url}
          onClick={e => {
            e.preventDefault();
            this.toggleModal();
          }}
        >
          {url}
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
