import {AppState, appReducer} from './app/reducer';
import {GamesState, gamesReducer} from './games/reducer';
import {KanbanState} from './kanban/interfaces';
import {kanbanReducer} from './kanban/reducer';
import {UsersState} from './randomUsers/interfaces';
import {userReducer} from './randomUsers/reducer';

export interface State {
    games: GamesState;
    users: UsersState;
    app: AppState;
    kanban: KanbanState;
}

const stateToReducer = {
    games: gamesReducer,
    users: userReducer,
    app: appReducer,
    kanban: kanbanReducer,
};

export default stateToReducer;
