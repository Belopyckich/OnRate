import {State} from '@redux/reducers';

export const selectDialog = (state: State, dialogName: string) =>
    state.dialogs[dialogName] ? state.dialogs[dialogName] : undefined;

export const selectDialogOpen = (state: State, dialogName: string) => {
    const dialog = state.dialogs[dialogName];

    return dialog ? dialog.open : false;
};

export const selectDialogProps = (state: State, dialogName: string) => {
    const dialog = state.dialogs[dialogName];

    return dialog ? dialog.dialogProps : undefined;
};
