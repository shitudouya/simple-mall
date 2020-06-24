import React, { Component } from "react";
import { Tabs, Button, message } from "antd";
import State from "./State";
import { getOrder, deleteAllOrder } from "../../../api";
import { categoryOrder } from "../../../utils/computed";
const { TabPane } = Tabs;

export default class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allData: [],
      allreadyData: [],
      noneData: []
    };
  }
  getAll = () => {
    getOrder().then((res) => {
      let data = categoryOrder(res.data);
      this.setState({
        allData: data,
        allreadyData: data.filter((item) => item[0].state === 1),
        noneData: data.filter((item) => item[0].state === 0)
      });
    });
  };
  componentDidMount() {
    this.getAll();
  }
  handleDeleteAll = () => {
    if (this.state.allData.length > 0) {
      deleteAllOrder().then((res) => {
        if (res.code === 200) {
          message.success("删除成功");
          this.getAll();
        }
      });
    } else {
      message.warn("当前没有订单可以删除");
    }
  };
  render() {
    const operations = (
      <Button danger onClick={this.handleDeleteAll}>
        删除全部
      </Button>
    );
    const { allData, allreadyData, noneData } = this.state;
    return (
      <div className="allOrder-body">
        <Tabs tabBarExtraContent={operations}>
          <TabPane tab=" 全部订单" key="1">
            {allData.length > 0 ? <State OrderData={allData} getAll={this.getAll} /> : <p>暂时没有订单</p>}
          </TabPane>
          <TabPane tab="已支付" key="2">
            {allData.length > 0 ? <State OrderData={allreadyData} getAll={this.getAll} /> : <p>暂时没有订单</p>}
          </TabPane>
          <TabPane tab="未支付" key="3">
            {allData.length > 0 ? <State OrderData={noneData} getAll={this.getAll} /> : <p>暂时没有订单</p>}
          </TabPane>
        </Tabs>
        ,
      </div>
    );
  }
}
