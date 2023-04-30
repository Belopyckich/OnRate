import {setUserBackground} from '@src/redux/app/actions';
import {selectCurrentUserBackground} from '@src/redux/app/selectors';
import cn from 'classnames';
import React from 'react';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';

import {DEFAULT_BACKGROUND} from '../../constants';
import styles from './styles.module.scss';

export interface BackgroundItemProps {
    currentBackground: string;
}

export const BackgroundItem = ({currentBackground}: BackgroundItemProps) => {
    const dispatch = useDispatch();

    const userBackground = useSelector(selectCurrentUserBackground);

    const isDefaultBackground = currentBackground === DEFAULT_BACKGROUND;

    return (
        <div className={styles.backgroundItemWrapper}>
            <div
                style={{
                    backgroundImage: `url(${currentBackground})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                }}
                className={cn(styles.backgroundItem, {
                    [styles.backgroundItemActive]:
                        currentBackground === userBackground,
                    [styles.backgroundItemDefault]: isDefaultBackground,
                })}
                onClick={() => dispatch(setUserBackground(currentBackground))}
            >
                {isDefaultBackground ? 'Нет фона' : ''}
            </div>
        </div>
    );
};
