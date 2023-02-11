import {GamesState, gamesReducer} from './games/reducer';
import {UserState, userReducer} from './user/reducer';

export interface State {
    games: GamesState;
    user: UserState;
}

const stateToReducer = {
    games: gamesReducer,
    user: userReducer,
};

export default stateToReducer;
