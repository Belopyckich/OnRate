import reducerMap, {State} from '@redux/reducers';
import rootSaga from '@redux/sagas';
import {ISagaModule} from 'redux-dynamic-modules-saga';

export default (): ISagaModule<State> => ({
    id: 'rootModule',
    reducerMap,
    retained: true,
    sagas: [rootSaga],
});
