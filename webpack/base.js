import { join, resolve } from "path";

import * as plugins from "./plugins";
import * as rules from "./rules";
import { IS_DEV_SERVER, IS_PROD, ROOT_DIR } from "./constants";
import { arrayFilterEmpty } from "./helpers";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";

const dependingOnConditionPlugins = IS_PROD ? [plugins.cleanWebpackPlugin, plugins.miniCssExtractPlugin] : [new ReactRefreshWebpackPlugin()]

const performance = IS_PROD ? {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  } : false;

export default {
  context: __dirname,
  target: IS_DEV_SERVER ? "web" : ["web", "es5"],
  mode: IS_PROD ? "production" : "development",
  entry: {
    main: [join(ROOT_DIR, "src/index.tsx")],
  },
  output: {
    path: join(ROOT_DIR, "dist"),
    publicPath: IS_DEV_SERVER ? undefined : "./",
    filename: IS_DEV_SERVER
      ? "[name].[fullhash].js"
      : "[name].[contenthash].js",
  },
  devtool: 'source-map',
  devServer: {
    inline: false,
    contentBase: join(ROOT_DIR, "dist"),
  },
  module: {
    rules: arrayFilterEmpty([
      rules.javascriptRule,
      rules.typescriptRule,
      rules.htmlRule,
      rules.imagesRule,
      rules.fontsRule,
      rules.cssRule,
      ...rules.lessRules,
      ...rules.sassRules,
      ...rules.svgRules,
      ...dependingOnConditionPlugins
    ]),
  },
  plugins: arrayFilterEmpty([
    plugins.htmlWebpackPlugin,
    plugins.providePlugin,
    plugins.definePlugin,
    plugins.forkTsCheckerWebpackPlugin,
    plugins.esLintPlugin,
  ]),
  resolve: {
    alias: {
      "@src": resolve(ROOT_DIR, "./src"),
      "@assets": resolve(ROOT_DIR, "./src/asset"),
      "@redux": resolve(ROOT_DIR, "./src/redux"),
      "@helpers": resolve(ROOT_DIR, "./src/helpers"),
      "@constants": resolve(ROOT_DIR, "./src/constants"),
      "@hooks": resolve(ROOT_DIR, "./src/hooks"),
      "@components": resolve(ROOT_DIR, "./src/components"),
      "@pages": resolve(ROOT_DIR, "./src/pages"),
    },
    extensions: [".tsx", ".ts", ".js", ".jsx"],
  },
  optimization: {
    runtimeChunk: {
    name: "runtime",
    },
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "initial",
        },
      },
    },
  },
  performance: performance,
};
