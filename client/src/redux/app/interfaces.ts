import {Country} from '@src/constants/locations/locations';

export interface User {
    email: string;
    id: string;
    name: string;
    location?: UserLocation;
    picture?: UserPicture;
    dob?: string;
}

export type UserForUpdate = Omit<User, 'picture'> & {
    picture?: FormData;
};

export type UserLocation = {
    city: string;
    country: Country;
};

export interface UserPicture {
    large: string;
    medium: string;
    thumbnail: string;
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
