import {USER_SETTINGS_FORM_FIELDS} from './constants';

export interface UserSettingsFormValues {
    [USER_SETTINGS_FORM_FIELDS.name]: string;
    [USER_SETTINGS_FORM_FIELDS.email]: string;
    [USER_SETTINGS_FORM_FIELDS.city]: string;
    [USER_SETTINGS_FORM_FIELDS.country]: string;
    [USER_SETTINGS_FORM_FIELDS.picture]: string;
    [USER_SETTINGS_FORM_FIELDS.date]: string;
    [USER_SETTINGS_FORM_FIELDS.age]: string;
}
