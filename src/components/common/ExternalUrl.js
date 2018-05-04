import React, { Component } from "react";
import MediaQuery from "react-responsive";
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
          title={this.props.url}
          onClick={e => {
            e.preventDefault();
            this.toggleModal();
          }}
        >
          <MediaQuery minWidth={820}>
            {this.props.url.slice(0, 20) + (this.props.url.length > 18 ? "..." : "")}
          </MediaQuery>
          <MediaQuery maxWidth={820}>
            {this.props.url.slice(0, 15) + (this.props.url.length > 12 ? "..." : "")}
          </MediaQuery>
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
