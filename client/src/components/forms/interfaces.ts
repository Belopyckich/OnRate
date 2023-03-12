import {AUTH_FORM_FIELDS} from './constants';

export interface User {
    [AUTH_FORM_FIELDS.login]: string;
    [AUTH_FORM_FIELDS.password]: string;
}
