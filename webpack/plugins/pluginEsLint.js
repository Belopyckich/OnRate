import { join } from "path";

import ESLintPlugin from "eslint-webpack-plugin";

import { ROOT_DIR } from "../constants";

const config = {
  context: join(ROOT_DIR, "./src"),
  extensions: ["js", "jsx", "ts", "tsx"],
};

export const esLintPlugin = new ESLintPlugin(config);
