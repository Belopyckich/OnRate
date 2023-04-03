export enum UserDropdownKeys {
    EnvironmentSettings = 'EnvironmentSettings',
    UserSettings = 'UserSettings',
    Logout = 'Logout',
}

export const USER_DROPDOWN_TITLES = {
    [UserDropdownKeys.EnvironmentSettings]: 'Настройки окружения',
    [UserDropdownKeys.UserSettings]: 'Настройки пользователя',
    [UserDropdownKeys.Logout]: 'Выйти',
};
