import React, { Component } from "react";
import "../assets/search.scss";
import { Affix, Input } from "antd";
import { withRouter } from "react-router-dom";
const { Search } = Input;

class HeaderSearch extends Component {
  onSearch = (value) => {
    this.props.history.push(`/search?keyword=${value}`);
    this.props.handleSearchVisible();
  };

  render() {
    const { searchVisible } = this.props;
    return (
      <Affix offsetTop={64} className={searchVisible ? "search-container" : "search-container hidden"}>
        <div className="mask">
          <Search
            className="search-content"
            placeholder="请输入要查询商品的关键字"
            onSearch={(value) => this.onSearch(value)}
            enterButton
          />
        </div>
      </Affix>
    );
  }
}

export default withRouter(HeaderSearch);
