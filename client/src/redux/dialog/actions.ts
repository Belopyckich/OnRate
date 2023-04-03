import {ShowDialogProps} from '@src/components/dialog/interface';
import {createAction} from 'typesafe-actions';

export const show = createAction('DIALOG/SHOW')<ShowDialogProps>();

export const close = createAction('DIALOG/CLOSE')<string>();
