import { Row, Col } from "antd";
import { Link } from "react-router-dom";

import React, { Component } from "react";

export default class History extends Component {
  state = {
    data: JSON.parse(localStorage.getItem("history")),
    getHistory: JSON.parse(localStorage.getItem("history")).length > 0 ? true : false
  };
  render() {
    return (
      <div>
        {!this.state.getHistory ? (
          <p>暂无记录</p>
        ) : (
          <>
            <Row gutter={16}>
              {this.state.data.map((item, index) => {
                return (
                  <Col key={index} className="gutter-row" span={4}>
                    <Link to={"/product/" + item.pid}>
                      <img width="120" style={{ display: "flex", margin: "auto" }} src={item.picture} alt={item.name} />
                      <p style={{ textAlign: "center", color: "salmon" }}>{item.nprice}元</p>
                    </Link>
                  </Col>
                );
              })}
            </Row>
          </>
        )}
      </div>
    );
  }
}
