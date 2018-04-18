/*eslint-disable no-script-url*/
import React, {Component} from 'react';
import NodeMap from "./NodeMap";
import {connect} from "react-redux";
import {loadNodes} from "../../actions/network";
import {sortBy, filter, sumBy} from "lodash";
import {tu, tv} from "../../utils/i18n";
import {BarLoader} from "../common/loaders";

class Nodes extends Component {

  constructor() {
    super();

    this.state = {
      showAllCountries: false,
      size: 5,
    };
  }

  buildNodeList = () => {
    let {nodes} = this.props;

    let nodesByCountry = {};
    for (let node of nodes) {
      if (!nodesByCountry[node.country]) {
        nodesByCountry[node.country] = {
          name: node.country,
          nodes: [],
          total: 0,
        }
      }
      nodesByCountry[node.country].nodes.push(node);
      nodesByCountry[node.country].total += node.count;
    }

    let countries = Object.values(nodesByCountry);
    countries = sortBy(countries, c => c.total);
    countries = filter(countries, c => c.name !== "null");
    countries.reverse();

    return countries;
  };

  renderList() {
    let {showAllCountries, size} = this.state;
    let {nodes} = this.props;
    let countries = this.buildNodeList();
    let shownCountries = countries;

    if (!showAllCountries) {
      shownCountries = shownCountries.slice(0, size);
    }

    if (nodes.length === 0) {
      return (
        <div className="d-flex justify-content-center p-4">
          <BarLoader />
        </div>
      );
    }

    return (
      <table className="table">
        <thead>
        <tr>
          <th>#</th>
          <th>{tu("country")}</th>
          <th>{tu("nodes")}</th>
        </tr>
        </thead>
        <tbody>
        {
          shownCountries.map((country, index) => (
            <tr key={country.name}>
              <td>{index + 1}</td>
              <td>{country.name}</td>
              <td>{country.total}</td>
            </tr>
          ))
        }
        </tbody>
      </table>
    );
  }

  componentDidMount() {
    this.props.loadNodes();
  }

  render() {
    let {showAllCountries, size} = this.state;

    let {nodes} = this.props;
    let countries = this.buildNodeList();

    return (
      <main className="container pt-3">
        <div className="row">
          <div className="col-sm-12 col-md-4">
            <div className="card">
              {
                nodes.length > 0 && <div className="card-header text-center border-bottom-0 bg-dark text-white">
                  {sumBy(countries, c => c.total)} {tu("nodes")}
                </div>
              }
              <div className="card-body p-0 border-0">
                {this.renderList()}
              </div>
              {
                (!showAllCountries && (countries.length - size > 0)) &&
                <div className="card-footer text-muted text-center">
                  <a href="javascript:;" onClick={() => this.setState({ showAllCountries: true })}>
                      {
                        tv("show_more", {
                          countriesLength: countries.length - size
                        })
                      }
                  </a>
                </div>
              }
            </div>
          </div>
          <NodeMap className="col-sm-12 col-md-8" nodes={nodes} />
        </div>
      </main>
    )
  }
}



function mapStateToProps(state) {
  return {
    nodes: state.network.nodes,
  };
}

const mapDispatchToProps = {
  loadNodes,
};

export default connect(mapStateToProps, mapDispatchToProps)(Nodes)
