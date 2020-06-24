import React, { Component } from "react";
import { Row, Col, Typography, Pagination } from "antd";
import { getProduct } from "../../api/index";
import "./style.scss";
import QueueAnim from "rc-queue-anim";
import { Link } from "react-router-dom";
const { Paragraph } = Typography;

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productList: [],
      currentPage: 1,
      defaultPageSize: 12
    };
  }
  getData = () => {
    getProduct({ cid: 3, pageNum: this.state.currentPage, pageSize: 12 })
      .then((res) => {
        this.setState({
          productList: !res.data?[]:res.data
        });
      })
      .catch((err) => {});
  };
  componentDidMount() {
    this.getData();
  }
  handleChange = (page) => {
    window.scroll({ top: 0 });
    this.setState(
      {
        currentPage: page
      },
      () => {
        this.getData();
      }
    );
  };
  render() {
    const { productList, currentPage } = this.state;
    return (
      <QueueAnim duration={1500} type="top">
        <Row key="1" gutter={16}>
          {productList.map((item, index) => {
            return (
              <Col key={index} className="gutter-row" span={6}>
                <Link to={"/product/" + item.pid}>
                  <div className="product-container">
                    <img src={item.picture} alt={item.name} />
                    <h3>{item.name}</h3>
                    <Paragraph ellipsis>{item.detail}</Paragraph>
                    <p className="price">{item.nprice}元</p>
                  </div>
                </Link>
              </Col>
            );
          })}
        </Row>
        <Pagination
          key="2"
          style={{ margin: "30px 0", textAlign: "center" }}
          current={currentPage}
          pageSize={12}
          total={20}
          onChange={this.handleChange}
        />
      </QueueAnim>
    );
  }
}
