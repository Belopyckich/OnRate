import {AuthForm} from '@src/pages/AuthPage/constants';
import React from 'react';

import {SIGNUP_FORM_FIELDS} from './constants';

export interface RegistrateUserForm {
    [SIGNUP_FORM_FIELDS.name]: string;
    [SIGNUP_FORM_FIELDS.email]: string;
    [SIGNUP_FORM_FIELDS.password]: string;
}

export interface LoginFormProps {
    setAuthForm: React.Dispatch<React.SetStateAction<AuthForm>>;
}
