import {LOCAL_STORAGE_KEYS} from '@constants/local-storage-keys';
/**
 * В дженерик передавать тип который вернет JSON.parse
 */
export const getExpectedParsedValue = <T>(value: string): T | null => {
    if (!value || typeof value !== 'string') {
        return null;
    }

    try {
        return JSON.parse(value);
    } catch {
        return null;
    }
};

export const getLocalStorageValue = (
    key: keyof typeof LOCAL_STORAGE_KEYS,
    valueKey?: string | number,
) => {
    const localStorageValue = localStorage.getItem(key);

    if (localStorageValue === null) {
        return localStorageValue;
    }

    try {
        const parsedValue = JSON.parse(localStorageValue);

        return valueKey ? parsedValue[valueKey] : parsedValue;
    } catch {
        return localStorageValue;
    }
};

export const setLocalStorageValue = <T>(
    key: keyof typeof LOCAL_STORAGE_KEYS,
    value: T,
    valueKey?: string | number,
) => {
    let localStorageValue = '';

    if (valueKey) {
        const currentValue = getLocalStorageValue(key);
        const newValue = {[valueKey]: value};

        localStorageValue = JSON.stringify(
            currentValue ? {...currentValue, ...newValue} : newValue,
        );
    } else {
        localStorageValue =
            typeof value === 'string' ? value : JSON.stringify(value);
    }

    localStorage.setItem(key, localStorageValue);
};
