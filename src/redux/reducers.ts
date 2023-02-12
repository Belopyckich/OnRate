import {AppState, appReducer} from './app/reducer';
import {GamesState, gamesReducer} from './games/reducer';
import {UserState, userReducer} from './user/reducer';

export interface State {
    games: GamesState;
    user: UserState;
    app: AppState;
}

const stateToReducer = {
    games: gamesReducer,
    user: userReducer,
    app: appReducer,
};

export default stateToReducer;
