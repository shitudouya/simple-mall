import React, { Component } from "react";
import { Table, Col, Row, InputNumber, Popconfirm, Button, message } from "antd";
import { computedMoney } from "../utils/computed";
import { getCart, deleteCart, submitOrder } from "../api/index";
import { withRouter } from "react-router-dom";

class Cart extends Component {
  state = {
    columns: [
      {
        title: "图片",
        align: "center",
        dataIndex: "picture",
        render: (pic) => <img width={80} src={pic} alt="iPhone" />
      },
      {
        title: "商品",
        align: "center",
        dataIndex: "name",
        ellipsis: true
      },
      {
        title: "价格",
        align: "center",
        dataIndex: "nprice",
        render: (price) => <>{price}元</>,
        ellipsis: true
      },
      {
        title: "数量",
        dataIndex: "count",
        align: "center",
        render: (count, record) => (
          <InputNumber min={1} max={100} value={count} onChange={this.numberChange.bind(this, record)} />
        )
      },
      {
        title: "小计",
        align: "center",
        dataIndex: "total",
        render: (total) => <>{total}元</>
      },
      {
        title: "操作",
        align: "center",
        dataIndex: "operation",
        render: (text, record) =>
          this.props.cartList.length >= 1 ? (
            <Popconfirm title="确定删除吗？" onConfirm={() => this.handleDelete(record.pid)}>
              <span style={{ color: "#ff7875", cursor: "pointer" }}>删除</span>
            </Popconfirm>
          ) : null
      }
    ]
  };
  numberChange = (record, value) => {
    this.props.change_count(record, value);
  };

  handleDelete = (pid) => {
    deleteCart(pid).then((res) => {
      if (res.code === 200) {
        message.success("删除成功");
        this.props.delete_cart(pid);
      } else {
        message.error("删除失败");
      }
    });
  };
  handleSubmit = () => {
    if (this.props.cartList.length > 0) {
      submitOrder(this.props.cartList).then((res) => {
        if (res.code === 200) {
          this.props.history.push("/checkout");
        } else {
          message.error("订单提交失败");
        }
      });
    } else {
      message.warning("购物车中暂时没有商品！");
    }
  };
  componentDidMount() {
    const isR = this.props.location.query;
    if (this.props.cartList.length === 0 || isR) {
      getCart().then((res) => {
        if (res.code === 110000) {
          localStorage.removeItem("token");
          message.error("状态失效，请重新登录！");
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else {
          this.props.add_cart(res.data);
        }
      });
    }
  }
  render() {
    const { columns } = this.state;
    const { cartList } = this.props;
    return (
      <Row className="cart-body">
        <Col flex="6">
          <Table pagination={false} columns={columns} dataSource={cartList} />
        </Col>
        <Col flex="auto">
          <div className="cart-total">
            <h1>结算</h1>
            <p>
              <span className="left">商品数</span>
              <span className="right">{cartList.length}</span>
            </p>
            <p>
              <span className="left">快递费</span>
              <span className="right">无</span>
            </p>
            <p>
              <span className="left">总价</span>
              <span className="right">{computedMoney(cartList)}元</span>
            </p>
            <Button block onClick={this.handleSubmit}>
              提交订单
            </Button>
          </div>
        </Col>
      </Row>
    );
  }
}

export default withRouter(Cart);
