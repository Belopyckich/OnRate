import {GamesState, gamesReducer} from './games/reducer';

export interface State {
    games: GamesState;
}

const stateToReducer = {
    games: gamesReducer,
};

export default stateToReducer;
