import React, { Component } from "react";
import "./style.scss";
import { connect } from "react-redux";
import { Like_Action, DeLike_Action } from "../../store/actions";
import Like from "../../components/Like";

class index extends Component {
  render() {
    const list = this.props.likeList;
    const { isLogin, add_like, delete_like } = this.props;
    const isExist = isLogin && localStorage.getItem("token");
    return (
      <div className="pocket_container">
        {isExist ? <Like list={list} add_like={add_like} delete_like={delete_like} /> : <p>登录后查看个人收藏</p>}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    likeList: state.LikeReducer.like_list,
    isLogin: state.UserReducer.isLogin
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    add_like: (value) => {
      dispatch(Like_Action(value));
    },
    delete_like: (pid) => {
      dispatch(DeLike_Action(pid));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(index);
