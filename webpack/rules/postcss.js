/*
 * @see https://github.com/postcss/postcss
 */
import { IS_PROD } from "../constants";
import { arrayFilterEmpty } from "../helpers";

module.exports = () => {
  const plugins = arrayFilterEmpty([
    "autoprefixer",
    IS_PROD ? "cssnano" : null,
  ]);
  return {
    plugins,
  };
};
