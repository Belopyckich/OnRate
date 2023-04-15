export const USER_SETTINGS_FORM_FIELDS = {
    picture: 'picture',
    name: 'name',
    email: 'email',
    city: 'city',
    country: 'country',
    dob: 'dob',
} as const;

export const USER_SETTINGS_FORM_LABELS = {
    [USER_SETTINGS_FORM_FIELDS.name]: 'Имя',
    [USER_SETTINGS_FORM_FIELDS.email]: 'Емэйл',
    [USER_SETTINGS_FORM_FIELDS.city]: 'Город',
    [USER_SETTINGS_FORM_FIELDS.country]: 'Страна',
    [USER_SETTINGS_FORM_FIELDS.dob]: 'Дата рождения',
} as const;

export const USER_PHOTO_SETTINGS_STYLES = {
    width: '160px',
    height: '160px',
    fontSize: '160px',
};

export const MIN_AGE_DIFFERENCE = 14;
