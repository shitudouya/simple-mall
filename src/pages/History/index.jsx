import React, { Component } from "react";
import { connect } from "react-redux";
import History from "../../components/History";
class index extends Component {
  render() {
    const isExist = this.props.isLogin && localStorage.getItem("token");
    return <div>{isExist ? <History /> : <p>登录后查看浏览记录</p>}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    isLogin: state.UserReducer.isLogin
  };
};

export default connect(mapStateToProps, null)(index);
