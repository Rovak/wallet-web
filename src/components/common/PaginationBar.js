import React, { Component } from "react";
import { range } from "lodash";

const WrapperPagination = ({ children }) => (
  <ul className="pagination justify-content-center">{children}</ul>
);

const Page = ({ value, isActive, onClick }) => (
  <li className={isActive ? "page-item active" : "page-item"}>
    <a className="page-link" onClick={withPreventDefault(onClick)}>
      {value}
    </a>
  </li>
);

const OtherBasicPage = ({ children, onClick }) => (
  <li className="page-item">
    <a className="page-link" onClick={withPreventDefault(onClick)}>
      {children}
    </a>
  </li>
);

const FirstPage = ({ onClick }) => (
  <OtherBasicPage onClick={onClick}>&laquo;</OtherBasicPage>
);

const PreviousPage = ({ onClick }) => (
  <OtherBasicPage onClick={onClick}>&lsaquo;</OtherBasicPage>
);

const NextPage = ({ onClick }) => (
  <OtherBasicPage onClick={onClick}>&rsaquo;</OtherBasicPage>
);

const LastPage = ({ onClick }) => (
  <OtherBasicPage onClick={onClick}>&raquo;</OtherBasicPage>
);

const withPreventDefault = f => e => {
  e.preventDefault();
  f();
};

class PaginationBar extends Component {
  constructor() {
    super();

    this.state = {
      pager: {}
    };
  }

  componentWillMount() {
    if (this.props.elements && this.props.elements.length) {
      this.setPage();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.elements !== prevProps.elements) {
      this.setPage();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.searchString !== nextProps.searchString) {
      this.setPage();
    }
  }

  setPage(page) {
    const { pageSize, blockSize } = this.props;
    const elements = this.props.filteredElements();
    const pager = PaginationBar.getPager(
      elements.length,
      page,
      pageSize,
      blockSize
    );
    const pagedElements = elements.slice(pager.startIndex, pager.endIndex + 1);

    this.props.onChangePage(pagedElements);
    this.setState({ pager });
  }

  static getPager(
    totalElements,
    currentPage = 1,
    pageSize = 10,
    blockSize = 10
  ) {
    const totalPage = Math.ceil(totalElements / pageSize);
    const halfBlockSize = Math.round(blockSize / 2);

    currentPage = currentPage < 1 ? 1 : currentPage;
    currentPage = currentPage > totalPage ? totalPage : currentPage;

    let startPage = currentPage - (currentPage - 1) % blockSize;
    let endPage = Math.min(startPage + (blockSize - 1), totalPage);

    if (totalPage <= blockSize) {
      startPage = 1;
      endPage = totalPage;
    } else {
      if (currentPage <= halfBlockSize + 1) {
        startPage = 1;
        endPage = blockSize;
      } else if (currentPage + (halfBlockSize - 1) >= totalPage) {
        startPage = totalPage - (blockSize - 1);
        endPage = totalPage;
      } else {
        startPage = currentPage - halfBlockSize;
        endPage = currentPage + (halfBlockSize - 1);
      }
    }

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize - 1, totalElements - 1);
    const pages = range(startPage, endPage + 1);

    return {
      totalElements,
      currentPage,
      pageSize,
      totalPage,
      startPage,
      endPage,
      startIndex,
      endIndex,
      pages
    };
  }

  render() {
    const { pages, currentPage, totalPage } = this.state.pager;

    if (!pages || !pages.length) {
      return null;
    }

    return (
      <WrapperPagination>
        <FirstPage onClick={() => this.setPage(1)} />
        <PreviousPage onClick={() => this.setPage(currentPage - 1)} />
        {pages.map(page => (
          <Page
            key={page}
            value={page}
            isActive={currentPage === page}
            onClick={() => this.setPage(page)}
          />
        ))}
        <NextPage onClick={() => this.setPage(currentPage + 1)} />
        <LastPage onClick={() => this.setPage(totalPage)} />
      </WrapperPagination>
    );
  }
}

export default PaginationBar;
