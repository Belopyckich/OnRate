import {DialogState} from '@src/components/dialog/interface';

import {AppState, appReducer} from './app/reducer';
import {DialogsState, dialogsReducer} from './dialog/reducer';
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
    dialogs: DialogsState;
}

const stateToReducer = {
    games: gamesReducer,
    users: userReducer,
    app: appReducer,
    kanban: kanbanReducer,
    dialogs: dialogsReducer,
};

export default stateToReducer;
