export const SIGNUP_FORM_FIELDS = {
    name: 'name',
    email: 'email',
    password: 'password',
} as const;

export const SIGNUP_FORM_PLACEHOLDERS = {
    [SIGNUP_FORM_FIELDS.name]: `Введите имя пользователя`,
    [SIGNUP_FORM_FIELDS.email]: `Введите емэил`,
    [SIGNUP_FORM_FIELDS.password]: `Введите пароль`,
} as const;
