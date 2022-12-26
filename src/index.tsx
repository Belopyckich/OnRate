import { App } from "@components/app/index";
import React from "react";
import ReactDOM from "react-dom/client";
import { StyleProvider } from "@ant-design/cssinjs";
import "./normalize.css";
import "./style.scss";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <StyleProvider hashPriority="high">
    <App />
  </StyleProvider>
);
