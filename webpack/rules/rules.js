import { IS_PROD, WEBPACK_DIR } from "../constants";
import { join } from "path";
import { ROOT_DIR } from "../constants";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

export const cssLoader = {
  loader: "css-loader",
};

export const sassLoaderItems = [
  {
    loader: "sass-loader",
    options: {
      sourceMap: true,
      // Prefer `dart-sass`
      implementation: require("sass"),
    },
  },
];

export const postCssLoader = {
  loader: "postcss-loader",
  options: {
    postcssOptions: {
      config: join(WEBPACK_DIR, "./postcss.js"),
    },
  },
  sourceMap: true,
};

/***
 * Using MiniCssExtractPlugin in production or style-loader in development
 * @see https://webpack.js.org/plugins/mini-css-extract-plugin/#root
 * @see https://webpack.js.org/loaders/style-loader/#root
 */
export const miniCssExtractLoader = IS_PROD
  ? {
      loader: MiniCssExtractPlugin.loader,
      options: {
        esModule: false,
      },
    }
  : {
      loader: "style-loader",
      options: {
        esModule: false,
      },
    };

/**
 * @see https://webpack.js.org/loaders/less-loader/#root
 */
export const lessLoader = {
  loader: "less-loader",
  options: {
    sourceMap: true,
    lessOptions: {
      javascriptEnabled: true,
    },
  },
};

export const babelLoader = {
  loader: "babel-loader",
  options: {
    configFile: join(ROOT_DIR, "/.babelrc.js"),
  },
};

/**
 * Using to convert CSS modules from css-loader to TypeScript typings
 * @see https://github.com/TeamSupercell/typings-for-css-modules-loader
 */
export const typingsCssModulesLoader = {
  loader: "@teamsupercell/typings-for-css-modules-loader",
  options: {
    banner:
      "// autogenerated by typings-for-css-modules-loader. \n// Please do not change this file!",
    formatter: "prettier",
  },
};

/**
 * @see https://webpack.js.org/loaders/sass-loader/#problems-with-url
 */
export const resolveUrlLoader = {
  loader: "resolve-url-loader",
  options: {
    sourceMap: true,
  },
};

export const cssModulesSupportLoaderItems = [
  miniCssExtractLoader,
  typingsCssModulesLoader,
  {
    ...cssLoader,
    options: {
      esModule: false,
      modules: {
        exportLocalsConvention: "camelCaseOnly",
        localIdentName: "[local]__[contenthash:base64:5]",
      },
    },
  },
];

export const cssLoaderItems = [miniCssExtractLoader, cssLoader];
