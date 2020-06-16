import React, { Component } from "react";
import "./style.scss";
import QueueAnim from "rc-queue-anim";
import { Row, Col, Tag, InputNumber, Button, notification,BackTop } from "antd";
import Comments from "../../components/Comments";
import { connect } from "react-redux";
import { getProductDetail, addCart, addMyLike, getLike } from "../../api";
import { Like_Action } from "../../store/actions";

const openNotificationWithIcon = (type, message) => {
  notification[type]({
    message
  });
};

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentProduct: "",
      total: 0,
      count: 1
    };
    this.numberRef = React.createRef();
  }
  AddToCart = () => {
    if (!this.props.isLogin || !localStorage.getItem("token")) {
      openNotificationWithIcon("warning", "请先登录！");
      return;
    }
    addCart({ pid: this.state.currentProduct.pid, count: this.state.count }).then((res) => {
      if (res.code === 200) {
        openNotificationWithIcon("success", "添加购物车成功！");
        setTimeout(() => {
          this.props.history.push({ pathname: "/cart", query: { r: "t" } });
        }, 100);
      } else {
        openNotificationWithIcon("error", "添加失败！请稍后再试");
      }
    });
  };
  componentDidMount() {
    getProductDetail({ pid: this.props.match.params.id })
      .then((res) => {
        this.setState({
          currentProduct: res.data,
          total: res.data.nprice
        });
        let tempArr = JSON.parse(localStorage.getItem("history"));
        let isAdd = true;
        if (tempArr.length === 0) {
          tempArr.push(res.data);
          localStorage.setItem("history", JSON.stringify(tempArr));
        } else {
          for (let i = 0; i < tempArr.length; i++) {
            if (tempArr[i].pid === res.data.pid) {
              isAdd = false;
            }
          }
          if (isAdd) {
            tempArr.push(res.data);
            localStorage.setItem("history", JSON.stringify(tempArr));
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  onChange = (value) => {
    this.setState({
      count: value,
      total: this.state.currentProduct.nprice * value
    });
  };
  handleLike = () => {
    if (!this.props.isLogin || !localStorage.getItem("token")) {
      openNotificationWithIcon("warning", "请先登录！");
      return;
    }
    addMyLike(this.state.currentProduct.pid).then((res) => {
      if (res.code === 200) {
        openNotificationWithIcon("success", "添加成功");
        getLike().then((result) => {
          this.props.add_like(result.data);
        });
      } else {
        openNotificationWithIcon("error", "添加失败");
      }
    });
  };
  render() {
    const { name, picture, mark, nprice, oprice, detail, pid } = this.state.currentProduct;

    const { count, total } = this.state;
    const { isLogin } = this.props;
    return (
      <div className="detail-body">
        <div className="detail-container">
          <QueueAnim type="bottom" delay={300}>
            <Row key="1">
              <Col className="detail-img" style={{marginRight:"20px"}}>
                <img src={picture} alt={name} />
              </Col>
              <Col flex="auto">
                <h1 className="name">{name}</h1>
                <p>{detail}</p>
                <p>编号：{mark}</p>
                <div className="detail-extra">
                  <Tag color="red">促销</Tag>
                  <Tag color="blue">限时抢购</Tag>
                  <Tag color="magenta">嗨购精选</Tag>
                  <Tag color="gold">闪电发货</Tag>
                </div>
                <h3 className="detail-price">
                  <p className="new">
                    <span>￥</span>
                    {nprice}
                    <span className="old">￥{oprice}</span>
                  </p>
                </h3>
                <div className="detail-count">
                  购买数量：
                  <InputNumber
                    onBlur={this.onblur}
                    ref={this.numberRef}
                    min={1}
                    max={100}
                    defaultValue={1}
                    onChange={this.onChange}
                  />
                </div>
                <div className="detail-total">
                  <p>
                    <span className="left">{name}</span>
                    <span className="right">X{count}</span>
                  </p>
                  <h3>总计：{total}元</h3>
                </div>
                <div className="detail-operate">
                  <Button type="primary" onClick={this.AddToCart}>
                    加入购物车
                  </Button>
                  <Button onClick={this.handleLike}>收藏商品</Button>
                </div>
              </Col>
            </Row>
            <Comments isLogin={isLogin} key="2" currentPid={pid} />
            <BackTop />
          </QueueAnim>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLogin: state.UserReducer.isLogin
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    add_like: (value) => {
      dispatch(Like_Action(value));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(index);
