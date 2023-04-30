import {Card, Tabs} from 'antd';
import TabPane from 'antd/es/tabs/TabPane';
import React, {useState} from 'react';

import {
    ENVIRONMENT_SETTINGS_TAB_TITLE,
    EnvironmentSettingsTab,
} from './constants';
import styles from './styles.module.scss';
import {SetThemeTab} from './tabs/setThemeTab/set-theme-tab';
import {UserSettingsTab} from './tabs/userSettingsTab/user-settings-tab';

const EnvironmentSettingsPage = () => {
    const [activeTab, setActiveTab] = useState(
        EnvironmentSettingsTab.UserSettings,
    );

    return (
        <Card className={styles.environmentSettingsPage}>
            <Tabs
                onChange={(tabKey: EnvironmentSettingsTab) =>
                    setActiveTab(tabKey)
                }
                activeKey={activeTab}
                items={[
                    {
                        key: EnvironmentSettingsTab.UserSettings,
                        label: ENVIRONMENT_SETTINGS_TAB_TITLE[
                            EnvironmentSettingsTab.UserSettings
                        ],
                        children: <UserSettingsTab />,
                    },
                    {
                        key: EnvironmentSettingsTab.SetTheme,
                        label: ENVIRONMENT_SETTINGS_TAB_TITLE[
                            EnvironmentSettingsTab.SetTheme
                        ],
                        children: <SetThemeTab />,
                    },
                ]}
            />
        </Card>
    );
};

export default EnvironmentSettingsPage;
