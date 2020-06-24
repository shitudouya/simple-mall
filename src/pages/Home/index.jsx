import React, { Component } from "react";
import { Carousel, Col, Row } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import "./style.scss";
import { getRecommend } from "../../api";
import QueueAnim from "rc-queue-anim";
import { Link } from "react-router-dom";

export default class index extends Component {
  next = () => {
    this.slider.slick.slickNext();
  };
  state = {
    dataList: []
  };
  prev = () => {
    this.slider.slick.slickPrev();
  };
  componentDidMount() {
    getRecommend().then((res) => {
      this.setState({
        dataList: !res.data?[]:res.data
      });
    });
  }
  render() {
    const { dataList } = this.state;

    return (
      <div className="home-container">
        <QueueAnim duration={1200} type="right">
          <div key="1" className="carousel-container">
            <Carousel ref={(el) => (this.slider = el)} autoplay>
              <div>
                <img
                  src="https://yanxuan.nosdn.127.net/10c87e5040aaa806120c253539fbeeea.jpg?type=webp&imageView&quality=95&thumbnail=1920x420"
                  alt="轮播图"
                />
              </div>
              <div>
                <img
                  src="https://yanxuan.nosdn.127.net/b011661a2c01c916dd619a2062d21611.jpg?type=webp&imageView&quality=95&thumbnail=1920x420"
                  alt="轮播图"
                />
              </div>
              <div>
                <img
                  src="https://yanxuan.nosdn.127.net/46285a2f3ef9bc112e1b894fee0dfa13.jpg?type=webp&imageView&quality=95&thumbnail=1920x420"
                  alt="轮播图"
                />
              </div>
              <div>
                <img
                  src="https://yanxuan.nosdn.127.net/bdc529ace83fa12ccbc6f00a0c1f1db2.jpg?type=webp&imageView&quality=95&thumbnail=1920x420"
                  alt="轮播图"
                />
              </div>
            </Carousel>
            <span className="left" onClick={this.prev}>
              <LeftOutlined />
            </span>
            <span className="right" onClick={this.next}>
              <RightOutlined />
            </span>
          </div>
          <div key="2" className="product-body">
            <Row gutter={16}>
              <Col className="gutter-row" span={5}>
                <div className="left">
                  <img
                    src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/574c6643ab91c6618bfb2d0e2c761d0b.jpg?thumb=1&w=293&h=768&f=webp&q=90"
                    alt="小米MIX Alpha"
                  />
                </div>
              </Col>
              <Col className="gutter-row" span={19}>
                <Row>
                  {dataList.map((item, index) => {
                    return (
                      <Col key={index} className="gutter-row item-body" span={6}>
                        <Link to={"/product/" + item.pid}>
                          <img src={item.picture} alt={item.name} />
                          <p className="describe"> {item.detail} </p>
                          <p className="price"> {item.nprice}元 </p>
                        </Link>
                      </Col>
                    );
                  })}
                </Row>
              </Col>
            </Row>
          </div>
        </QueueAnim>
      </div>
    );
  }
}
