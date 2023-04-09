export const USER_SETTINGS_FORM_FIELDS = {
    picture: 'picture',
    name: 'name',
    email: 'email',
    city: 'city',
    country: 'country',
    dob: 'dob',
} as const;

export const USER_SETTINGS_FORM_LABELS = {
    [USER_SETTINGS_FORM_FIELDS.name]: 'Name',
    [USER_SETTINGS_FORM_FIELDS.email]: 'Email',
    [USER_SETTINGS_FORM_FIELDS.city]: 'City',
    [USER_SETTINGS_FORM_FIELDS.country]: 'Country',
    [USER_SETTINGS_FORM_FIELDS.picture]: 'Picture',
    [USER_SETTINGS_FORM_FIELDS.dob]: 'Date Of Birth',
} as const;

export const USER_PHOTO_SETTINGS_STYLES = {
    width: '160px',
    height: '160px',
    fontSize: '160px',
};

export const MIN_AGE_DIFFERENCE = 14;
