import { join } from "path";

import HtmlWebpackPlugin from "html-webpack-plugin";

import { ROOT_DIR } from "../constants";

const config = {
  filename: "index.html",
  inject: true,
  template: join(ROOT_DIR, "./src/index.html"),
};

export const htmlWebpackPlugin = new HtmlWebpackPlugin(config);
