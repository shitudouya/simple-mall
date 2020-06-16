import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import loadable from "../utils/loadable";
const Main = loadable(() => import("../components/CommonBody"));
const Home = loadable(() => import("../pages/Home/index"));
const Computer = loadable(() => import("../pages/Computer/index"));
const Pocket = loadable(() => import("../pages/Pocket/index"));
const Life = loadable(() => import("../pages/Life/index"));
const Mobile = loadable(() => import("../pages/Mobile/index"));
const Cart = loadable(() => import("../pages/Cart/index"));
const Detail = loadable(() => import("../pages/Detail/index"));
const NotFound = loadable(() => import("../pages/NotFound/index"));
const History = loadable(()=>import("../pages/History/index"))
const Order = loadable(()=>import ("../pages/Order/index"))
const Result = loadable(()=>import ("../pages/Result/index"))
const Search = loadable(()=>import('../pages/Search/index'))
class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route path="/product/:id" component={Detail}></Route>
        <Route exact path="/checkout" component={Order}></Route>
        <Route path="/checkout/result" component={Result}></Route>
        <Route path="/search" component={Search}></Route>
        <Route path="/" component={Main}></Route>
      </Switch>
    );
  }
}

class Child extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/computer" component={Computer}></Route>
        <Route exact path="/life" component={Life}></Route>
        <Route exact path="/mobile" component={Mobile}></Route>
        <Route exact path="/pocket" component={Pocket}></Route>
        <Route exact path="/cart" component={Cart}></Route>
        <Route exact path="/history" component={History}></Route>
        <Route component={NotFound} />
      </Switch>
    );
  }
}

export { Routes, Child };
