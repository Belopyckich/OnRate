import {UploadFileCallbackProps} from '@src/components/dialogs/imageEditorDialog/interfaces';
import {Country} from '@src/constants/locations/locations';
import {User} from '@src/redux/app/interfaces';
import {Nullable} from '@src/typings';
import dayjs from 'dayjs';

import {USER_SETTINGS_FORM_FIELDS} from './constants';

export interface UserSettingsFormValues {
    [USER_SETTINGS_FORM_FIELDS.name]: string;
    [USER_SETTINGS_FORM_FIELDS.email]: string;
    [USER_SETTINGS_FORM_FIELDS.city]: string;
    [USER_SETTINGS_FORM_FIELDS.country]: Country;
    [USER_SETTINGS_FORM_FIELDS.picture]?: Nullable<
        Partial<UploadFileCallbackProps>
    >;
    [USER_SETTINGS_FORM_FIELDS.dob]?: dayjs.Dayjs;
}

export type UserToUpdate = UserSettingsFormValues & {
    id: string;
};

export interface UpdateUserProps {
    user: UserToUpdate;
    callback: (user: User) => void;
}
