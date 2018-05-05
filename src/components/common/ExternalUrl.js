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
      const url = this.props.url.length>30?this.props.url.substring(0,30)+'...':this.props.url
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
          <MediaQuery minWidth={920}>
            {(this.props.url.length > 30 ? this.props.url.slice(0, 30) + "..." : this.props.url)}
          </MediaQuery>
          <MediaQuery maxWidth={920}>
            {(this.props.url.length > 15 ? this.props.url.slice(0, 15) + "..." : this.props.url)}
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
