import {messages} from '@src/constants/messages';
import {EMAIL_VALIDATION_REGEXP} from '@src/constants/reg-exp-constants';
import {Any} from '@src/typings';

import {COUPLE_EMAILS_FIELD} from './constants';
import {getStringWithRightSeparator} from './helpers';

export const validateEmail = async (rule: Any, value: string) => {
    if (!value) {
        return false;
    }

    const formattedValue = value.toLowerCase();

    const emails = getStringWithRightSeparator(formattedValue)
        .split(',')
        .filter(Boolean);

    const validEmails = !emails
        .reduce((acc: boolean[], email) => {
            acc.push(Boolean(email) && !EMAIL_VALIDATION_REGEXP.test(email));
            return acc;
        }, [])
        .some((i): boolean => !i);

    if (validEmails) {
        return Promise.reject(new Error(messages.emailInvalid));
    }

    if (rule.field !== COUPLE_EMAILS_FIELD && validEmails) {
        return Promise.reject(new Error(messages.emailSingle));
    }

    return Promise.resolve();
};
