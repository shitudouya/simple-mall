import React, { Component } from "react";
import { Layout, Row, Col, Affix, Avatar, Menu, Dropdown, message } from "antd";
import Login from "../components/LoginForm";
import Register from "../components/RegisterForm";
import DrawerInfo from "./DrawerInfo";
import { SearchOutlined } from "@ant-design/icons";
import HeaderSearch from "./HeaderSearch";
import "../assets/header.scss";
import { Link } from "react-router-dom";
const { Header } = Layout;

function AlreadyLogin() {
  return (
    <React.Fragment>
      <Login />
      <Register />
    </React.Fragment>
  );
}

function MyMenu() {
  return (
    <Menu>
      <Menu.Item>
        <a onClick={(e) => this.handleDrawerVisible(e)} href="https://mall.tudoublog.com">
          我的信息
        </a>
      </Menu.Item>
      <Menu.Item>
        <a onClick={(e) => this.handleLogout(e)} href="https://mall.tudoublog.com">
          退出登录
        </a>
      </Menu.Item>
    </Menu>
  );
}

export default class CommonHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerVisible: false,
      searchVisible: false
    };
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (!nextProps.user_info) {
      message.error("状态失效，请重新登录");
      localStorage.removeItem("token");
      window.location.reload();
    }
  }
  handleDrawerVisible = (e) => {
    if (e) {
      e.preventDefault();
    }
    this.setState({
      drawerVisible: !this.state.drawerVisible
    });
  };
  handleSearchVisible = () => {
    this.setState({
      searchVisible: !this.state.searchVisible
    });
  };
  handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    window.location.reload();
  };
  render() {
    const { drawerVisible, searchVisible } = this.state;
    const { user_info, isLogin } = this.props;
    return (
      <Layout>
        <Affix>
          <Header className="header">
            <Row>
              <Col span={8} className="logo-container">
                <Link to="/" title="返回首页">
                  <img src={require("../assets/logo.png")} alt="logo" />
                </Link>
              </Col>
              <Col span={5} offset={11}>
                <div className="controls">
                  <SearchOutlined className="header-search" onClick={this.handleSearchVisible} title="搜索商品" />
                  {isLogin ? (
                    <>
                      <Avatar src={user_info.avatar} />
                      <Dropdown overlay={MyMenu.bind(this)}>
                        <a
                          className="ant-dropdown-link"
                          title={user_info.username}
                          href="https://mall.tudoublog.com"
                          onClick={(e) => e.preventDefault()}
                        >
                          {user_info.username}
                        </a>
                      </Dropdown>
                      ,
                      <DrawerInfo
                        user_info={user_info}
                        visible={drawerVisible}
                        handleDrawerVisible={this.handleDrawerVisible}
                      />
                    </>
                  ) : (
                    <AlreadyLogin></AlreadyLogin>
                  )}
                </div>
              </Col>
            </Row>
          </Header>
        </Affix>
        <HeaderSearch searchVisible={searchVisible} handleSearchVisible={this.handleSearchVisible} />
      </Layout>
    );
  }
}
