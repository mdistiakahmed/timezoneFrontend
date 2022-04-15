import { UserRoles } from './GeneralConstants';

export type UserDTO = {
    username: string;
    password: string;
    sysadmin?: boolean;
};

export type UserSignUpModel = {
    username: string;
    password: string;
};

export interface UserInterface {
    userData: UserDTO[];
    pageNumber: number;
    pageSize: number;
    totalElements: number;
}

export type UserData = {
    email: string;
    password?: string;
    role: UserRoles;
};

export interface SinginFormInput {
    email: string;
    password: string;
    role: string;
}

export interface UserUpdateModalInput {
    username: string;
    role: string;
}
