import {State} from '@redux/reducers';

export const selectIsSidebarOpen = (state: State) => state.app.isSidebarOpen;
