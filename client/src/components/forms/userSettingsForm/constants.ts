export const USER_SETTINGS_FORM_FIELDS = {
    picture: 'picture',
    name: 'name',
    email: 'email',
    city: 'city',
    country: 'country',
    date: 'date',
    age: 'age',
} as const;

export const USER_SETTINGS_FORM_LABELS = {
    [USER_SETTINGS_FORM_FIELDS.name]: 'Name',
    [USER_SETTINGS_FORM_FIELDS.email]: 'Email',
    [USER_SETTINGS_FORM_FIELDS.city]: 'City',
    [USER_SETTINGS_FORM_FIELDS.country]: 'Country',
    [USER_SETTINGS_FORM_FIELDS.picture]: 'Picture',
    [USER_SETTINGS_FORM_FIELDS.date]: 'Date',
    [USER_SETTINGS_FORM_FIELDS.age]: 'Age',
} as const;
