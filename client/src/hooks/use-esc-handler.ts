import {useEffect} from 'react';

const useEscHandler = (onClose: () => void) => {
    const pressEscHandler = (event: KeyboardEvent) => {
        const {key} = event;
        if (key === 'Escape') {
            onClose();
        }
    };

    useEffect(() => {
        addEventListener('keyup', pressEscHandler);
        return () => {
            removeEventListener('keyup', pressEscHandler);
        };
    }, []);
};

export default useEscHandler;
