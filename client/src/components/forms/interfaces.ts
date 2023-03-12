import {AUTH_FORM_FIELDS} from './constants';

export interface UserForm {
    [AUTH_FORM_FIELDS.email]: string;
    [AUTH_FORM_FIELDS.password]: string;
}
