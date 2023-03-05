import {Nullable} from '@src/typings';
import {Tooltip} from 'antd';
import {TooltipPlacement} from 'antd/lib/tooltip';
import cn from 'classnames';
import React, {useEffect, useRef, useState} from 'react';
import {useCurrentWidth} from 'react-socks';

import styles from './styles.module.scss';

interface TextOverflowProps {
    extraTextStyles?: React.CSSProperties;
    extraClassName?: string;
    extraClassNameTooltip?: string;
    placement?: TooltipPlacement;
    text?: Nullable<string | number>;
    id?: string;
    isUnderline?: boolean;
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
    setIsTruncated?: (isTruncated: boolean) => void;
}

/* Для корректной работы данной компоненты должна быть
правильно определена ширина родительского блока
 */
export const TextOverflow = ({
    text,
    extraTextStyles,
    extraClassName,
    placement,
    id,
    onClick,
    extraClassNameTooltip,
    setIsTruncated,
    isUnderline,
}: TextOverflowProps) => {
    const [isTruncatedText, setIsTruncatedText] = useState(false);

    /* Хук добавлен для отслеживания изменения ширины экрана
    и отработки хука useEffect на эти изменения
     */
    const displayWidth = useCurrentWidth();

    const ref = useRef<Nullable<HTMLDivElement>>(null);

    useEffect(() => {
        if (ref.current) {
            const {scrollWidth, offsetWidth} = ref.current;

            const isTruncatedTitle = scrollWidth > offsetWidth;

            if (isTruncatedTitle !== isTruncatedText) {
                setIsTruncatedText(isTruncatedTitle);
                setIsTruncated?.(isTruncatedTitle);
            }
        }
    }, [displayWidth, ref.current]);

    if (!text) {
        return null;
    }

    const renderText = (
        <div
            onClick={onClick}
            className={cn(
                styles.textOverflow,
                {[styles.textOverflowUnderline]: isUnderline},
                extraClassName,
            )}
            ref={ref}
            style={extraTextStyles}
            id={id}
        >
            {text}
        </div>
    );

    return isTruncatedText ? (
        <Tooltip
            placement={placement}
            title={text}
            overlayClassName={extraClassNameTooltip}
        >
            {renderText}
        </Tooltip>
    ) : (
        renderText
    );
};
