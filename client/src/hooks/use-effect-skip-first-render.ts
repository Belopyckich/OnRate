import {DependencyList, useEffect, useRef} from 'react';

export const useEffectSkipFirstRender = (
    callback: () => void,
    deps: DependencyList,
) => {
    const ref = useRef(true);

    useEffect(() => {
        if (ref.current) {
            ref.current = false;
        } else {
            callback();
        }
    }, deps);
};
