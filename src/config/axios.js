import axios from "axios";
import NProgress from "nprogress";
import { notification } from "antd";
const { BASE_URL } = require("./env");

axios.defaults.withCredentials = true;
axios.defaults.baseURL = BASE_URL;
axios.defaults.timeout = 8000;

const openNotificationWithIcon = (type, description) => {
  notification[type]({
    message: "错误",
    description
  });
};

axios.interceptors.request.use(
  (config) => {
    const isToken = localStorage.getItem("token");
    if (isToken) {
      config.headers.token = isToken;
    }
    NProgress.start();
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    NProgress.done();
    return response.data;
  },
  (error) => {
    NProgress.done();
    if (error.response) {
      const { status } = error.response;
      if (status === 401 || status === 403) {
        openNotificationWithIcon("error", "Error!状态失效，请重新登录");
        localStorage.removeItem("token");
      } else {
        openNotificationWithIcon("error", "Error!网络请求异常");
      }
    }
    openNotificationWithIcon("error", "Error!网络请求异常");
    return Promise.reject(error);
  }
);

export default axios;
