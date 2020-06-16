import React, { Component } from "react";
import "./style.scss";
import QueueAnim from "rc-queue-anim";
import { Table, Row, Col, Button, Radio, message } from "antd";
import ExpressIcon from "../../components/ExpressIcon";
import ChangeAddress from "../../components/ChangeAddress";
import { getCart, clearCart } from "../../api";
import { computedMoney } from "../../utils/computed";
import { connect } from "react-redux";
import { DeleteAllCart_Action } from "../../store/actions";

class index extends Component {
  state = {
    data: [],
    newAddress:'暂未设置收货地址',
    columns: [
      {
        title: "图片",
        dataIndex: "picture",
        align: "center",
        render: (text, record) => <img width="80" src={text} alt={record.name} />
      },
      {
        title: "商品名称",
        align: "center",
        dataIndex: "name"
      },
      {
        title: "单价",
        align: "center",
        dataIndex: "nprice",
        render: (text) => <span>{text}元</span>
      },
      {
        title: "数量",
        align: "center",
        dataIndex: "count"
      },
      {
        title: "总价",
        align: "center",
        dataIndex: "total",
        render: (text) => <span style={{ color: "#F85F66" }}>{text}元</span>
      }
    ],
    expressName: "顺丰快递",
    showAddressModal: false
  };
  changeExpress = (value) => {
    this.setState({
      expressName: value
    });
  };
  SetShowAddress = () => {
    this.setState({
      showAddressModal: !this.state.showAddressModal
    });
  };
  handleOK = () => {
    clearCart().then(res=>{
      if(res.code === 200) {
        message.success("订单提交成功！");
        this.props.history.push("/checkout/result");
        this.props.clear_cart()
      } else {
        message.error("订单异常！请稍后再试")
      }
    })
  };
  componentDidMount() {
    getCart().then((res) => {
      this.setState({
        data: res.data
      });
    });
  }
  handleAddress = (value) => {
    const address = `${value.person} ${value.phone} ${value.address}`
    this.setState({
      newAddress:address
    })
  }
  render() {
    const { data, columns, expressName, showAddressModal,newAddress } = this.state;
    const { address } = this.props.user_info;
    const isExist = data && data.length > 0 && localStorage.getItem("token");
    return !isExist ? (
      <p></p>
    ) : (
      <div className="order-container">
        <div className="order-body">
          <QueueAnim type="top" delay={300} duration={800}>
            <h1 key="1" className="order-title">
              确认订单
            </h1>
            <Table key="2" columns={columns} dataSource={data} size="middle" pagination={false}></Table>
            <div key="3" className="sendType">
              <Row gutter={30}>
                <Col className="gutter-row" span={4} style={{ display: "flex", alignItems: "center" }}>
                  <h3>配送方式</h3>
                </Col>
                <Col className="gutter-row" span={14}>
                  <ExpressIcon changeExpress={this.changeExpress} />
                </Col>
                <Col className="gutter-row" span={6} style={{ display: "flex", alignItems: "center" }}>
                  已选择：{expressName}
                </Col>
              </Row>
            </div>
            <div key="4" className="order-address">
              <Row gutter={30}>
                <Col className="gutter-row" span={4} style={{ display: "flex", alignItems: "center" }}>
                  <h3>收货地址</h3>
                </Col>
                <Col className="gutter-row" span={18}>
                  {address === "暂未设置收货地址" ? (
                    <>
                      {newAddress}
                      <Button type="link" onClick={this.SetShowAddress}>
                        点击修改
                      </Button>
                      <ChangeAddress visible={showAddressModal} sendAddress={this.handleAddress} handleCancel={this.SetShowAddress} />
                    </>
                  ) : (
                    address
                  )}
                </Col>
              </Row>
            </div>
            <div key="5" className="payType">
              <Row gutter={30}>
                <Col className="gutter-row" span={4} style={{ display: "flex", alignItems: "center" }}>
                  <h3>支付方式</h3>
                </Col>
                <Col className="gutter-row pay-container" span={16}>
                  <Radio.Group defaultValue="支付宝">
                    <Radio.Button value="支付宝"></Radio.Button>
                    <Radio.Button value="微信"></Radio.Button>
                    <Radio.Button value="分期"></Radio.Button>
                  </Radio.Group>
                </Col>
              </Row>
            </div>
            <div key="6" className="result">
              <Row>
                <Col span={4} className="result-title">
                  汇总
                </Col>
                <Col span={6} offset={14}>
                  <p>
                    商品件数：<span>{data ? data.length : 0}件</span>
                  </p>
                  <p>
                    商品总价: <span>{computedMoney(data)}元</span>
                  </p>
                  <p>
                    运费: <span>0元</span>
                  </p>
                  <p>
                    应付总额： <span className="total-money">{computedMoney(data)}元</span>
                  </p>
                </Col>
              </Row>
            </div>
            <div key="7" className="operate">
              <Row>
                <Col span={4}></Col>
                <Col span={8} offset={12}>
                  <Button type="default" onClick={(e) => this.props.history.push("/cart")}>
                    返回购物车
                  </Button>
                  <Button type="primary" onClick={this.handleOK}>
                    确认订单
                  </Button>
                </Col>
              </Row>
            </div>
          </QueueAnim>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user_info: state.UserReducer.userInfo
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    clear_cart: () => {
      dispatch(DeleteAllCart_Action());
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(index);
