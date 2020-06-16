import React, { Component } from "react";
import { Layout, Menu } from "antd";

import { createFromIconfontCN } from "@ant-design/icons";
import { Child } from "../router/index";
import { Link } from "react-router-dom";
import "../assets/body.scss";
const { Content, Footer, Sider } = Layout;

const IconFont = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_1872233_0re6abx8pvuj.js"
});
export default class CommonBody extends Component {
  componentDidMount() {
    console.log();
  }
  render() {
    return (
      <Layout className="body-container">
        <Content className="site-content">
          <Layout className="site-layout-background site-layout">
            <Sider className="site-layout-background" width={200}>
              <Menu
                mode="inline"
                defaultSelectedKeys={["/home"]}
                selectedKeys={[this.props.location.pathname]}
                style={{ height: "100%" }}
              >
                <Menu.Item key="/">
                  <IconFont type="icon-zhuye" />
                  <Link to="/">首页推荐</Link>
                </Menu.Item>
                <Menu.Item key="/mobile">
                  <IconFont type="icon-shouji" />
                  <Link to="/mobile">手机平板</Link>
                </Menu.Item>
                <Menu.Item key="/computer">
                  <IconFont type="icon-diannao-shuju" />
                  <Link to="/computer">电脑办公</Link>
                </Menu.Item>
                <Menu.Item key="/life">
                  <IconFont type="icon-shenghuozhushou" />
                  <Link to="/life">家居生活</Link>
                </Menu.Item>
                <Menu.Item key="/cart">
                  <IconFont type="icon-gouwuchezhengpin" />
                  <Link to="/cart">购物车</Link>
                </Menu.Item>
                <Menu.Item key="/pocket">
                  <IconFont type="icon-shoucang" />
                  <Link to="/pocket">我的收藏</Link>
                </Menu.Item>
                <Menu.Item key="/history">
                  <IconFont type="icon-liulanjilu" />
                  <Link to="/history">浏览记录</Link>
                </Menu.Item>
              </Menu>
            </Sider>
            <Content style={{ padding: "0 20px", minHeight: "calc(100vh - 213px)" }}>
              <Child />
            </Content>
          </Layout>
        </Content>
        <Footer style={{ textAlign: "center" }}>嗨购 Copyright &copy;2020 All rights reserved.</Footer>
      </Layout>
    );
  }
}
