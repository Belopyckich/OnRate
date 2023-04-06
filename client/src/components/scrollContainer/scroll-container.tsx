import {checkIsMobile} from '@src/helpers/check-is-mobile';
import cn from 'classnames';
import React, {useEffect, useRef} from 'react';

import {
    scrollContainer,
    scrollContainerHorizontal,
    scrollContainerVertical,
    scrollContainerVerticalWrapper,
    scrollContainerWithoutScrollbar,
} from './styles.module.scss';

export enum ScrollMode {
    Horizontal,
    Vertical,
}

interface ScrollContainerProps {
    children: React.ReactElement | React.ReactElement[];
    mode?: ScrollMode;
    scrollContainerWithScrollbar?: boolean;
}

export const ScrollContainer = ({
    mode = ScrollMode.Vertical,
    children,
    scrollContainerWithScrollbar = false,
}: ScrollContainerProps) => {
    const isMobile = checkIsMobile();

    const scrollContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isVertical) {
            scrollContainerRef.current?.addEventListener('wheel', onWheel, {
                passive: false,
            });
        }

        return () => {
            if (!isVertical) {
                scrollContainerRef.current?.removeEventListener(
                    'wheel',
                    onWheel,
                );
            }
        };
    }, []);

    const isVertical = mode === ScrollMode.Vertical;

    const onWheel = (event: WheelEvent) => {
        event.preventDefault();
        if (scrollContainerRef.current?.scrollLeft !== undefined) {
            scrollContainerRef.current.scrollLeft += event.deltaY;
        }
    };

    return (
        <div
            className={cn(
                scrollContainer,
                isVertical
                    ? scrollContainerVertical
                    : scrollContainerHorizontal,
                {
                    [scrollContainerWithoutScrollbar]:
                        scrollContainerWithScrollbar && !isMobile,
                },
            )}
            ref={isVertical ? undefined : scrollContainerRef}
        >
            {isVertical ? (
                <div className={scrollContainerVerticalWrapper}>{children}</div>
            ) : (
                children
            )}
        </div>
    );
};
