import React, { Component } from "react";
import { getUrlQueryObj } from "../../utils/computed";
import { searchProduct } from "../../api";
import { SearchOutlined } from "@ant-design/icons";
import QueueAnim from "rc-queue-anim";
import "./style.scss";
import { Row, Col } from "antd";
import { Link } from "react-router-dom";

export default class index extends Component {
  state = {
    Lists: []
  };
  searchKey = (search) => {
    search = search ? search : this.props.location.search;
    if (search && search.length > 8) {
      const keyword = decodeURI(getUrlQueryObj(search).keyword);
      searchProduct({ keyword }).then((res) => {
        this.setState({
          Lists: res
        });
      });
    }
  };
  componentDidMount() {
    this.searchKey();
  }
  componentWillReceiveProps(nextProps) {
    this.searchKey(nextProps.location.search);
  }

  render() {
    const { Lists } = this.state;
    return (
      <div className="search-box">
        <QueueAnim duration={500} type="bottom">
          <h3 key="1" className="title">
            <SearchOutlined style={{ marginRight: "10px", verticalAlign: "middle" }} />
            搜索结果
          </h3>
          {Lists.length > 0 ? (
            <Row key="2" gutter={16}>
              {Lists.map((item, index) => {
                return (
                  <Col key={index} className="gutter-row p-item" span={6}>
                    <Link to={"/product/" + item.pid}>
                      <img src={item.picture} alt={item.name} />
                      <p className="name"> {item.name} </p>
                      <p className="detail"> {item.detail} </p>
                      <p className="price"> {item.nprice}元 </p>
                    </Link>
                  </Col>
                );
              })}
            </Row>
          ) : (
            <p key="3">暂无搜索数据</p>
          )}
        </QueueAnim>
      </div>
    );
  }
}
