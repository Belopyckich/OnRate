import {composeWithDevTools} from 'redux-devtools-extension';
import {IExtension, IModuleStore, createStore} from 'redux-dynamic-modules';
import {getSagaExtension} from 'redux-dynamic-modules-saga';
import {getThunkExtension} from 'redux-dynamic-modules-thunk';
import {createLogger} from 'redux-logger';

import reduxRootModule from './module';
import {State} from './reducers';

const logger = createLogger({
    collapsed: true,
    duration: false,
    timestamp: true,
});

const extensionsList: IExtension[] = [getSagaExtension(), getThunkExtension()];
if (!IS_PROD) {
    extensionsList.push({middleware: [logger]});
}

const store: IModuleStore<State> = createStore(
    {
        enhancers: [],
        extensions: extensionsList,
        advancedComposeEnhancers: composeWithDevTools({}),
    },
    reduxRootModule(),
);

export default store;
