import React, { Component } from "react";
import { Link } from "react-router-dom";
import QueueAnim from "rc-queue-anim";
import { Row, Col, Button } from "antd";
import { getLike, deleteLike } from "../api";

export default class Like extends Component {
  componentDidMount() {
    if (this.props.list.length === 0) {
      getLike().then((res) => {
        this.props.add_like(res.data);
      });
    }
  }
  handleDelete = (e, pid) => {
    e.preventDefault();
    deleteLike(pid).then((res) => {
      console.log(res);
    });
    this.props.delete_like(pid);
  };
  render() {
    const { list } = this.props;
    return (
      <>
        <h1 className="title">收藏的商品</h1>
        {list.length > 0 ? (
          <QueueAnim type="right" duration={1000}>
            <Row key="1" gutter={[16, 24]}>
              {list.map((value, index) => {
                return (
                  <Col key={index} style={{ padding: "30px" }} className="gutter-row pocket_item" span={6}>
                    <Link to={"/product/" + value.pid}>
                      <div className="pocket_box">
                        <img width="100%" src={value.picture} alt={value.name} />
                        <h3>{value.name}</h3>
                        <p> {value.nprice}元</p>
                      </div>
                      <div className="mask"></div>
                      <Row className="operate">
                        <Col className="gutter-row" span={5}>
                          <Button type="link" danger onClick={(e) => this.handleDelete(e, value.pid)}>
                            删除
                          </Button>
                        </Col>
                        <Col className="gutter-row">
                          <Button type="link">查看详情</Button>
                        </Col>
                      </Row>
                    </Link>
                  </Col>
                );
              })}
            </Row>
          </QueueAnim>
        ) : (
          <p>暂无收藏的商品</p>
        )}
      </>
    );
  }
}
