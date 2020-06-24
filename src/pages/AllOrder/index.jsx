import React, { Component } from "react";
import "./style.scss";
import Order from "./components/Order";
import { connect } from "react-redux";

class index extends Component {
  render() {
    const isExist = this.props.isLogin && localStorage.getItem("token");
    return <div>{isExist ? <Order /> : <p>登录后查看个人订单</p>}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    isLogin: state.UserReducer.isLogin
  };
};

export default connect(mapStateToProps, null)(index);
