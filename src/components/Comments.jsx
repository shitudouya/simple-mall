import React, { Component } from "react";
import "../assets/comment.scss";
import { Comment, Form, Button, List, Input, Alert, notification } from "antd";
import { Divider } from "antd";
import { getComments, sendComments } from "../api";

const { TextArea } = Input;

const openNotificationWithIcon = (type, message) => {
  notification[type]({
    message
  });
};

export default class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      pic: "",
      data: []
    };
  }
  onChange = (e) => {
    this.setState({
      value: e.target.value
    });
  };
  onSubmit = () => {
    if (!this.props.isLogin || !localStorage.getItem("token")) {
      openNotificationWithIcon("warning", "登录后方可评论");
      return;
    }
    if (this.state.value.trim().length < 3) {
      openNotificationWithIcon("warning", "评论字数太少！");
      return;
    }
    sendComments({ pid: this.props.currentPid, content: this.state.value }).then((res) => {
      if (res.code === 200) {
        openNotificationWithIcon("success", "评论成功！");
        this.getCom();
      } else {
        openNotificationWithIcon("error", "请求错误");
      }
    });
    this.setState({
      value: ""
    });
  };
  getCom = () => {
    getComments(this.props.currentPid).then((res) => {
      if (res.data) {
        this.setState({
          data: res.data
        });
      }
    });
  };
  componentDidMount() {
    this.getCom();
  }
  render() {
    const { value, data } = this.state;
    return (
      <div className="comment-body">
        <Divider plain>商品评论</Divider>
        <Alert
          message="友情提示"
          description="富强、民主、文明、和谐、自由、平等、公正、法治、爱国、敬业、诚信、友善。"
          type="success"
          showIcon
        />
        <Form.Item>
          <TextArea rows={4} onChange={this.onChange} value={value} />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" onClick={this.onSubmit} type="primary">
            添加评论
          </Button>
        </Form.Item>
        <List
          className="comment-list"
          header={`共${data.length}条评论`}
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item) => (
            <li>
              <Comment
                author={item.nickname}
                avatar={item.avatar}
                content={item.content}
                datetime={new Date(item.createTime).toLocaleString()}
              />
            </li>
          )}
        />
        ,
      </div>
    );
  }
}
