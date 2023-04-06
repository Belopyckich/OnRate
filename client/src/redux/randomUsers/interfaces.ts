import {Dob, User, UserPicture} from '../app/interfaces';

export interface RandomUser {
    email: string;
    id: RandomUserId;
    name: UserInitials;
    location: RandomUserLocation;
    picture: UserPicture;
    dob: Dob;
}

export interface UserInitials {
    title: string;
    first: string;
    last: string;
}

export interface RandomUserId {
    name: string;
    value: string;
}

export interface RandomUserLocation {
    street: Street;
    city: string;
    state: string;
    country: string;
    postcode: string;
    coordinates: Coordinates;
    timezone: Timezone;
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
export interface UsersState {
    users: User[];
    isLoading: boolean;
}

export interface RandomUserResponse<T> {
    results?: T;
}
