import React from "react";
import Loadable from "react-loadable";

const loadingComponent = () => {
  return <p></p>;
};

export default (loader, loading = loadingComponent) => {
  return Loadable({
    loader,
    loading
  });
};
