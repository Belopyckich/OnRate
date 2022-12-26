import { IS_DEV, ROOT_DIR } from "../constants";
import { join } from "path";

import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";

const config = {
  async: IS_DEV,
  typescript: {
    configFile: join(ROOT_DIR, "./tsconfig.json"),
    memoryLimit: 8192,
  },
};

export const forkTsCheckerWebpackPlugin = new ForkTsCheckerWebpackPlugin(
  config
);
