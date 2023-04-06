import {CITIES} from '@src/constants/locations/locations';

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

export const shouldUpdateUserSettingsLocationField =
    (setFieldsValue: (values: Partial<UserSettingsFormValues>) => void) =>
    (previous: UserSettingsFormValues, current: UserSettingsFormValues) => {
        const [prevCountry, prevCity, currCountry, currCity] = [
            previous[USER_SETTINGS_FORM_FIELDS.country],
            previous[USER_SETTINGS_FORM_FIELDS.city],
            current[USER_SETTINGS_FORM_FIELDS.country],
            current[USER_SETTINGS_FORM_FIELDS.city],
        ];

        const shouldUpdateCountry = prevCountry !== currCountry;
        const shouldUpdateCity = prevCity !== currCity;

        const shouldUpdate = shouldUpdateCountry || shouldUpdateCity;

        if (shouldUpdate) {
            setFieldsValue(
                shouldUpdateCountry
                    ? {
                          [USER_SETTINGS_FORM_FIELDS.city]: currCountry
                              ? CITIES[currCountry][0]
                              : undefined,
                      }
                    : {},
            );
        }

        return shouldUpdate;
    };
