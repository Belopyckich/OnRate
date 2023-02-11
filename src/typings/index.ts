export interface KeyData<T = Any> {
    [key: string]: T;
}

export type Nullable<T> = T | null;

export type Any = any;

export type AtLeastOne<T, U = {[K in keyof T]: Pick<T, K>}> = Partial<T> &
    U[keyof U];

export type TupleKeys<T extends readonly [...T]> = T[number];

export enum ConvertedBooleanToNumberType {
    True = 1,
    False = 0,
}

export enum ConvertedBooleanToStringType {
    True = '1',
    False = '0',
}

export enum Theme {
    Light = 'light',
    Dark = 'dark',
}
