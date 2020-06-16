import React, { Component } from "react";
import UploadAvatar from "./UploadAvatar";
import { Drawer, List, Button, message } from "antd";
import "../assets/drawerInfo.scss";
import ChangeAddress from "./ChangeAddress";
import { ObjectToArray } from "../utils/computed";
import { updateUserAddress } from "../api";
import { connect } from "react-redux";
import { Add_User_Action } from "../store/actions";

class DrawerInfo extends Component {
  state = {
    addressVisible: false,
    myAddress: this.props.user_info.address,
    myAvatar: ""
  };
  handleClose = () => {
    this.props.handleDrawerVisible();
    this.setState({
      myAddress: this.props.user_info.address
    });
  };
  handleCancel = (e) => {
    this.setState({
      addressVisible: !this.state.addressVisible
    });
  };
  sendAddress = (value) => {
    const address = `${value.person} ${value.phone} ${value.address}`;
    this.setState({
      myAddress: address
    });
  };
  getAvatar = (value) => {
    this.setState({
      myAvatar: value
    });
  };
  handleSubmit = () => {
    updateUserAddress({ address: this.state.myAddress }).then((res) => {
      if (res.code === 200) {
        message.success("保存成功！");
        this.props.add_user();
        this.props.handleDrawerVisible();
      } else {
        message.error("保存失败");
      }
    });

  };
  render() {
    const { visible, user_info } = this.props;
    const { addressVisible, myAddress } = this.state;
    return (
      <Drawer
        title="我的信息"
        placement="right"
        maskClosable={false}
        onClose={this.handleClose}
        closable={true}
        destroyOnClose={true}
        visible={visible}
        width={360}
        className="drawer-content"
      >
        <UploadAvatar avatar={user_info.avatar} sendValue={this.getAvatar} />
        <div className="personalInfo">
          <List
            itemLayout="horizontal"
            dataSource={ObjectToArray(user_info)}
            renderItem={(item) => (
              <List.Item
                actions={
                  item[0] === "收货地址"
                    ? [
                        <a onClick={this.handleCancel} href="#!" key="list-edit">
                          更改
                        </a>
                      ]
                    : ""
                }
              >
                <List.Item.Meta title={item[0]} description={item[0] === "收货地址" ? myAddress : item[1]} />
              </List.Item>
            )}
          />
          <div className="operate">
            <Button type="primary" onClick={this.handleSubmit}>
              保存
            </Button>
            <Button type="default" onClick={this.handleClose}>
              退出
            </Button>
          </div>
        </div>
        <ChangeAddress sendAddress={this.sendAddress} visible={addressVisible} handleCancel={this.handleCancel} />
      </Drawer>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    add_user: () => {
      dispatch(Add_User_Action());
    }
  };
};

export default connect(null, mapDispatchToProps)(DrawerInfo);
