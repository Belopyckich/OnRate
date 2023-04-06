import {RandomUserLocation} from './../randomUsers/interfaces';

export interface User {
    email: string;
    id: string;
    name: string;
    location?: UserLocation;
    picture?: UserPicture;
    dob?: Dob;
}

export type UserLocation = Pick<RandomUserLocation, 'city' | 'country'>;

export interface UserPicture {
    large: string;
    medium: string;
    thumbnail: string;
}

export interface Dob {
    date: string;
    age: number;
}

export interface LoginResponse extends User {
    isActivated: boolean;
}

export interface AuthorizeResponse {
    accessToken: string;
    refreshToken: string;
    user: User;
}

export interface ApiResponse<T> {
    success: boolean;
    data?: T;
}
