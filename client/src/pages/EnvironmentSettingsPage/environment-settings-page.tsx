import {APP_ROUTES} from '@src/constants';
import {Card, Tabs} from 'antd';
import TabPane from 'antd/es/tabs/TabPane';
import React, {useState} from 'react';

import {
    ENVIRONMENT_SETTINGS_TAB_TITLE,
    EnvironmentSettingsTab,
} from './constants';

const EnvironmentSettingsPage = () => {
    const [activeTab, setActiveTab] = useState(
        EnvironmentSettingsTab.UserSettings,
    );

    return (
        <Card>
            <Tabs
                animated={true}
                onChange={(tabKey: EnvironmentSettingsTab) =>
                    setActiveTab(tabKey)
                }
                activeKey={activeTab}
            >
                <TabPane
                    tab={
                        ENVIRONMENT_SETTINGS_TAB_TITLE[
                            EnvironmentSettingsTab.UserSettings
                        ]
                    }
                    key={EnvironmentSettingsTab.UserSettings}
                >
                    {
                        ENVIRONMENT_SETTINGS_TAB_TITLE[
                            EnvironmentSettingsTab.UserSettings
                        ]
                    }
                </TabPane>

                <TabPane
                    tab={
                        ENVIRONMENT_SETTINGS_TAB_TITLE[
                            EnvironmentSettingsTab.SetTheme
                        ]
                    }
                    key={EnvironmentSettingsTab.SetTheme}
                >
                    {
                        ENVIRONMENT_SETTINGS_TAB_TITLE[
                            EnvironmentSettingsTab.SetTheme
                        ]
                    }
                </TabPane>
            </Tabs>
        </Card>
    );
};

export default EnvironmentSettingsPage;
