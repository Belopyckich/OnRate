import {selectBackgrounds} from '@src/redux/app/selectors';
import React from 'react';
import {useSelector} from 'react-redux';

import {BackgroundItem} from './components/backgroundItem/background-item';
import {DEFAULT_BACKGROUND} from './constants';
import styles from './styles.module.scss';

export const SetThemeTab = () => {
    const backgrounds = useSelector(selectBackgrounds);

    return (
        <div className={styles.setThemeTab}>
            <div className={styles.setThemeTabTitle}>
                Выберите фоновое изображение
            </div>

            <div className={styles.setThemeTabDescription}>
                Установите любой понравившийся фон, который будет отображаться
                на всех страницах сервиса. В любой момент его можно сменить в
                настройках, либо отключить
            </div>

            {backgrounds?.length && (
                <div className={styles.setThemeTabContent}>
                    {[DEFAULT_BACKGROUND, ...backgrounds].map((background) => (
                        <BackgroundItem
                            currentBackground={background}
                            key={background}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};
