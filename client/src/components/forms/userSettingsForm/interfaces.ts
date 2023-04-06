import {UploadFileCallbackProps} from '@src/components/dialogs/imageEditorDialog/interfaces';
import {Countries} from '@src/constants/locations/locations';

import {USER_SETTINGS_FORM_FIELDS} from './constants';

export interface UserSettingsFormValues {
    [USER_SETTINGS_FORM_FIELDS.name]?: string;
    [USER_SETTINGS_FORM_FIELDS.email]: string;
    [USER_SETTINGS_FORM_FIELDS.city]?: string;
    [USER_SETTINGS_FORM_FIELDS.country]?: Countries;
    [USER_SETTINGS_FORM_FIELDS.picture]: Partial<UploadFileCallbackProps>;
    [USER_SETTINGS_FORM_FIELDS.date]?: string;
    [USER_SETTINGS_FORM_FIELDS.age]?: string;
}
