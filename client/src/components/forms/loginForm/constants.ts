export const AUTH_FORM_FIELDS = {
    email: 'email',
    password: 'password',
} as const;

export const AUTH_FORM_PLACEHOLDERS = {
    [AUTH_FORM_FIELDS.email]: 'Введите емэил',
    [AUTH_FORM_FIELDS.password]: 'Введите пароль',
} as const;
