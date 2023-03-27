import {AuthForm} from '@src/pages/AuthPage/constants';
import React from 'react';

import {AUTH_FORM_FIELDS} from './constants';

export interface UserForm {
    [AUTH_FORM_FIELDS.email]: string;
    [AUTH_FORM_FIELDS.password]: string;
}

export interface LoginFormProps {
    setAuthForm: React.Dispatch<React.SetStateAction<AuthForm>>;
}
