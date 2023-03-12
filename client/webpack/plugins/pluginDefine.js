import {DefinePlugin} from 'webpack';

import {IS_DEV, IS_PROD, MODE} from '../constants';

const config = {
    'process.env': {
        NODE_ENV: JSON.stringify(MODE),
    },
    IS_PROD: IS_PROD,
    IS_DEV: IS_DEV,
};

export const definePlugin = new DefinePlugin(config);
