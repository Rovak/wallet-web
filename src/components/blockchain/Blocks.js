/* eslint-disable no-undef */
import React from "react";
import {tu} from "../../utils/i18n";
import {loadTokens} from "../../actions/tokens";
import {connect} from "react-redux";
import {Pagination, PaginationItem, PaginationLink} from "reactstrap";

class Blocks extends React.Component {

  constructor() {
    super();

    this.state = {
      blocks: [],
    };
  }

  componentDidUpdate() {

  }

  render() {

    let {blocks} = this.state;

    return (
      <main role="main" className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="mt-1 bg-white">
              <Pagination>
                <PaginationItem>
                  <PaginationLink previous href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">
                    1
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">
                    2
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">
                    3
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">
                    4
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">
                    5
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink next href="#" />
                </PaginationItem>
              </Pagination>
              <table className="table table-striped">
                <thead className="thead-dark">
                <tr>
                  <th>#</th>
                  <th>{tu("age")}</th>
                  <th><i className="fas fa-exchange-alt"/></th>
                  <th className="text-right">{tu("balance")}</th>
                </tr>
                </thead>
                <tbody>
                {
                  blocks.map((blocks, index) => (
                    <tr key={blocks.address}>
                      <th scope="row">{index + 1}</th>
                      <td>{blocks.address}</td>
                      <td className="text-right">
                      </td>
                    </tr>
                  ))
                }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    )
  }

}





function mapStateToProps(state) {
  return {
  };
}

const mapDispatchToProps = {
  loadTokens,
};

export default connect(mapStateToProps, mapDispatchToProps)(Blocks);
