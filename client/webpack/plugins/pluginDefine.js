import {DefinePlugin} from 'webpack';

import {API_URL, IS_DEV, IS_PROD, MODE} from '../constants';

const config = {
    'process.env': {
        NODE_ENV: JSON.stringify(MODE),
    },
    IS_PROD: IS_PROD,
    IS_DEV: IS_DEV,
    API_URL: API_URL,
};

export const definePlugin = new DefinePlugin(config);
