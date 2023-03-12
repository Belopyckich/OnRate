import {Nullable} from '@src/typings';

export interface UserInitials {
    title: string;
    first: string;
    last: string;
}

export interface Street {
    number: number;
    name: string;
}

export interface Coordinates {
    latitude: string;
    longitude: string;
}

export interface Timezone {
    offset: string;
    description: string;
}

export interface Location {
    street: Street;
    city: string;
    state: string;
    country: string;
    postcode: string;
    coordinates: Coordinates;
    timezone: Timezone;
}

export interface Dob {
    date: string;
    age: number;
}

export interface UserPicture {
    large: string;
    medium: string;
    thumbnail: string;
}

export interface User {
    gender: 'female' | 'male';
    name: UserInitials;
    location: Location;
    email: string;
    dob: Dob;
    phone: string;
    nat: string;
}

export interface UsersState {
    currentUser: Nullable<User>;
    users: User[];
    isLoading: boolean;
}

export interface ApiResponse<T> {
    results?: T;
}
