import React, { Component } from "react";
import { Card, Button, Row, Col, message } from "antd";
import QueueAnim from "rc-queue-anim";
import { Link } from "react-router-dom";
import { deleteOrderByID } from "../../../api";

export default class State extends Component {
  handleDelete = (id) => {
    deleteOrderByID(id).then((res) => {
      if (res.code === 200) {
        message.success("删除成功");
        this.props.getAll();
      }
    });
  };
  render() {
    const { OrderData } = this.props;
    return (
      <React.Fragment>
        {OrderData.map((value, index) => {
          return (
            <QueueAnim key={index} type="top" duration={1000}>
              <Card
                key={index}
                size="small"
                title={new Date(value[0].createTime).toLocaleString() + " —— 订单编号：" + value[0].onumber.toUpperCase()}
                extra={
                  <>
                    <Button type="link" onClick={(e) => this.handleDelete(value[0].onumber)} danger>
                      删除
                    </Button>
                  </>
                }
                style={{ width: "100%" }}
              >
                {value.map((item, i) => {
                  return (
                    <Card.Grid key={i} hoverable={false} style={{ width: "100%" }}>
                      <Link to={"/product/" + item.pid}>
                        <Row gutter={16}>
                          <Col className="gutter-row" span={4}>
                            <img className="card-img" src={item.picture} alt={item.name} />
                          </Col>
                          <Col className="gutter-row" span={4}>
                            <div>{item.name}</div>
                            <p className="card-detail">{item.detail}</p>
                          </Col>
                          <Col className="gutter-row" span={4}>
                            <p>{item.nprice}元</p>
                          </Col>
                          <Col className="gutter-row" span={4}>
                            <p>X{item.count}</p>
                          </Col>
                          <Col className="gutter-row" span={4}>
                            <p>{item.count * item.nprice}元</p>
                          </Col>
                          <Col className="gutter-row" span={4}>
                            <p>{item.state === 0 ? "未支付" : "已支付"}</p>
                          </Col>
                        </Row>
                      </Link>
                    </Card.Grid>
                  );
                })}
              </Card>
            </QueueAnim>
          );
        })}
      </React.Fragment>
    );
  }
}
