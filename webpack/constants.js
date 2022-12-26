import { join } from "path";

export const MODE = process.env.NODE_ENV ?? "development";
export const IS_DEV = MODE === "development";
export const IS_DEV_SERVER = process.env.WEBPACK_IS_DEV_SERVER === "true";
export const IS_PROD = !IS_DEV;
export const DEFAULT_PORT = 3000;
export const ROOT_DIR = join(__dirname, "../");
export const WEBPACK_DIR = __dirname;
