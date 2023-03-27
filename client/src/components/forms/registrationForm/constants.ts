export const SIGNUP_FORM_FIELDS = {
    name: 'name',
    email: 'email',
    password: 'password',
} as const;

export const SIGNUP_FORM_LABELS = {
    [SIGNUP_FORM_FIELDS.name]: 'Name',
    [SIGNUP_FORM_FIELDS.email]: 'Email',
    [SIGNUP_FORM_FIELDS.password]: 'Password',
} as const;

export const SIGNUP_FORM_PLACEHOLDERS = {
    [SIGNUP_FORM_FIELDS.name]: `Please enter ${
        SIGNUP_FORM_LABELS[SIGNUP_FORM_FIELDS.name]
    }`,
    [SIGNUP_FORM_FIELDS.email]: `Please enter ${
        SIGNUP_FORM_LABELS[SIGNUP_FORM_FIELDS.email]
    }`,
    [SIGNUP_FORM_FIELDS.password]: `Please enter ${
        SIGNUP_FORM_LABELS[SIGNUP_FORM_FIELDS.password]
    }`,
} as const;
