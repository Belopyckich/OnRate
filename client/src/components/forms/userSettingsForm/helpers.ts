import {USER_SETTINGS_FORM_FIELDS} from './constants';

export const getUserSettingsFormPlaceholder = (
    key: keyof typeof USER_SETTINGS_FORM_FIELDS,
) => `Please enter ${USER_SETTINGS_FORM_FIELDS[key]}`;
