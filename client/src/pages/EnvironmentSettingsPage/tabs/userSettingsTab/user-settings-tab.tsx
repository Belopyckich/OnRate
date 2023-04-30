import {SIDEBAR_TITLE} from '@src/components/sidebar/constants';
import {ThemeSwitch} from '@src/components/themeSwitch/theme-switch';
import {APP_ROUTES} from '@src/constants';
import {setUserStartPage} from '@src/redux/app/actions';
import {
    selectCurrentUser,
    selectCurrentUserEnvironmentSettings,
} from '@src/redux/app/selectors';
import {ThemeContext} from '@src/themes/theme-provider';
import {Checkbox, Radio} from 'antd';
import React, {useContext, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import styles from './styles.module.scss';

export const UserSettingsTab = () => {
    const dispatch = useDispatch();

    const {isChangedThemeBySystem, setIsChangedThemeBySystem} =
        useContext(ThemeContext);

    const currentUserEnvironmentSettings = useSelector(
        selectCurrentUserEnvironmentSettings,
    );
    console.log(
        '🚀 ~ currentUserEnvironmentSettings:',
        currentUserEnvironmentSettings,
    );

    const options = [
        {label: SIDEBAR_TITLE[APP_ROUTES.KANBAN], value: APP_ROUTES.KANBAN},
        {
            label: SIDEBAR_TITLE[APP_ROUTES.USER_SETTINGS],
            value: APP_ROUTES.USER_SETTINGS,
        },
        {
            label: SIDEBAR_TITLE[APP_ROUTES.ENVIRONMENT_SETTINGS],
            value: APP_ROUTES.ENVIRONMENT_SETTINGS,
        },
    ];

    return (
        <div className={styles.userSettingsTab}>
            <div className={styles.userSettingsTabOption}>
                <div className={styles.userSettingsTabOptionTitle}>
                    Выберите стартовую страницу
                </div>
                <div className={styles.userSettingsTabOptionDescription}>
                    Данная настройка позволяет выбрать начальную страницу
                    сервиса, которая будет загружена сразу после авторизации в
                    системе
                </div>

                <Radio.Group
                    options={options}
                    onChange={(event) =>
                        dispatch(setUserStartPage(event.target.value))
                    }
                    value={currentUserEnvironmentSettings?.startPage}
                />
            </div>

            <div className={styles.userSettingsTabOption}>
                <div className={styles.userSettingsTabOptionTitle}>
                    Выберите тему интерфейса
                </div>

                <div className={styles.userSettingsTabOptionDescription}>
                    Данная настройка позволяет переключаться между темной и
                    светолой темой интерфейса системы. Цвет темы также можно
                    переключать в боковом меню
                </div>

                <ThemeSwitch isSidebarOpen={true} />

                <Checkbox
                    checked={isChangedThemeBySystem}
                    onChange={(e) =>
                        setIsChangedThemeBySystem(e.target.checked)
                    }
                >
                    Использовать настройку системы
                </Checkbox>
            </div>
        </div>
    );
};
