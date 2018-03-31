import React, {Component} from 'react';
import NodeMap from "./NodeMap";
import {connect} from "react-redux";
import {loadNodes} from "../../actions/network";
import {sortBy, filter, sumBy} from "lodash";
import {BarLoader} from "react-spinners";

class Nodes extends Component {

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

    let {nodes} = this.props;
    let countries = this.buildNodeList();

    if (nodes.length === 0) {
      return (
        <div className="text-center d-flex justify-content-center p-4">
          <BarLoader color={'#343a40'} loading={true} height={5} width={150}/>
        </div>
      );
    }
    return (
      <table className="table">
        <thead>
        <tr>
          <th>#</th>
          <th>Country</th>
          <th>Nodes</th>
        </tr>
        </thead>
        <tbody>
        {
          countries.map((country, index) => (
            <tr>
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
    let {nodes} = this.props;
    let countries = this.buildNodeList();

    return (
      <main className="container pt-3">
        <div className="row">
          <div className="col-sm-12 col-md-4">
            <div className="card">
              {
                nodes.length > 0 && <div className="card-header text-center border-bottom-0 bg-dark text-white">
                  {sumBy(countries, c => c.total)} Nodes
                </div>
              }
              <div className="card-body p-0 border-0">
                {this.renderList()}
              </div>
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
