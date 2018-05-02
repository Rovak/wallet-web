import React from "react";
import { connect } from "react-redux";
import { debounce, omit } from "lodash";
import { search } from "../../actions/app";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isFocused: false,
      searchString: ""
    };

    this.handleDebouncedChange = debounce(this.handleDebouncedChange, 0);
  }

  clearSearch = () => {
    this.setState({
      searchString: ""
    });

    this.input.focus();
  };

  toggleFocus = () => {
    this.setState({
      isFocused: !this.state.isFocused
    });
  };

  handleDebouncedChange = searchString => {
    this.setState({
      searchString
    });
  };

  handleChange = event => {
    const { value } = event.target;
    const searchString = value.toUpperCase().trim();

    this.props.search(searchString);

    if (!value) {
      this.clearSearch();
      return;
    }

    if (value) {
      this.handleDebouncedChange(value);
    }
  };

  render() {
    return (
      <form className="form-inline">
        <input
          type="search"
          ref={ref => (this.input = ref)}
          value={this.state.searchString}
          onChange={this.handleChange}
          onFocus={this.toggleFocus}
          onBlur={this.toggleFocus}
          className="form-control mr-sm-2"
        />
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    searchString: state.app.searchString
  };
}

const mapDispatchToProps = {
  search
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
