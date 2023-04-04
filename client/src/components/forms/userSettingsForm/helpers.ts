import {USER_SETTINGS_FORM_FIELDS} from './constants';
import {UserSettingsFormValues} from './interfaces';

export const getUserSettingsFormPlaceholder = (
    key: keyof typeof USER_SETTINGS_FORM_FIELDS,
) => `Please enter ${USER_SETTINGS_FORM_FIELDS[key]}`;

export const shouldUpdateUserSettingsField =
    (fieldIds: (keyof UserSettingsFormValues)[]) =>
    (previous: UserSettingsFormValues, current: UserSettingsFormValues) => {
        for (const fieldId of fieldIds) {
            const [prev, curr] = [previous[fieldId], current[fieldId]];

            if (prev !== curr) {
                return true;
            }
        }

        return false;
    };
