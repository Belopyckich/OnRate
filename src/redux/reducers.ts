import {AppState, appReducer} from './app/reducer';
import {GamesState, gamesReducer} from './games/reducer';
import {UsersState} from './users/interfaces';
import {userReducer} from './users/reducer';

export interface State {
    games: GamesState;
    users: UsersState;
    app: AppState;
}

const stateToReducer = {
    games: gamesReducer,
    users: userReducer,
    app: appReducer,
};

export default stateToReducer;
