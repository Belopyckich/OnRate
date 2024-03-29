import LogoutIcon from '@src/assets/logout.component.svg';
import SettingsIcon from '@src/assets/settings.component.svg';
import UserSettingsIcon from '@src/assets/user-settings.component.svg';
import {TextOverflow} from '@src/components/textOverflow/text-overflow';
import {UserPhoto} from '@src/components/userPhoto/user-photo';
import {APP_ROUTES} from '@src/constants';
import {logoutUser} from '@src/redux/app/actions';
import {selectCurrentUser} from '@src/redux/app/selectors';
import {Dropdown} from 'antd';
import React from 'react';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';

import {USER_DROPDOWN_TITLES, UserDropdownKeys} from './constants';
import styles from './styles.module.scss';

export const UserDropdown = () => {
    const dispatch = useDispatch();

    const currentUser = useSelector(selectCurrentUser);

    const history = useNavigate();

    const menu = {
        items: [
            {
                label: USER_DROPDOWN_TITLES[
                    UserDropdownKeys.EnvironmentSettings
                ],
                key: UserDropdownKeys.EnvironmentSettings,
                icon: <SettingsIcon />,
                onClick: () => history(APP_ROUTES.ENVIRONMENT_SETTINGS),
            },
            {
                label: USER_DROPDOWN_TITLES[UserDropdownKeys.UserSettings],
                key: UserDropdownKeys.UserSettings,
                icon: <UserSettingsIcon />,
                onClick: () => history(APP_ROUTES.USER_SETTINGS),
            },
            {
                label: USER_DROPDOWN_TITLES[UserDropdownKeys.Logout],
                key: UserDropdownKeys.Logout,
                icon: <LogoutIcon />,
                onClick: () => dispatch(logoutUser()),
                danger: true,
            },
        ],
    };

    return (
        <Dropdown menu={menu} trigger={['click']}>
            <div className={styles.userDropdown}>
                <UserPhoto
                    username={currentUser?.name}
                    src={currentUser?.picture?.medium}
                />

                <TextOverflow
                    text={currentUser?.name}
                    extraClassName={styles.userDropdownText}
                />
            </div>
        </Dropdown>
    );
};
