import {SIDEBAR_TITLE} from '@src/components/sidebar/constants';
import {ThemeSwitch} from '@src/components/themeSwitch/theme-switch';
import {APP_ROUTES} from '@src/constants';
import {Checkbox, Radio} from 'antd';
import React, {useState} from 'react';

import styles from './styles.module.scss';

export const UserSettingsTab = () => {
    const [startPage, setStartPage] = useState();

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
                    onChange={(event) => setStartPage(event.target.value)}
                    value={startPage}
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

                <Checkbox>Использовать настройку системы</Checkbox>
            </div>
        </div>
    );
};
