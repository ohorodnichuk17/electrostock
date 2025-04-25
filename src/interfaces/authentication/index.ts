import {Status} from "../../utils/enums";

export interface IUser {
    id: number,
    name: string,
    email: string,
    roles: string[]
}

export interface IAuthenticationState {
    user: IUser | null,
    token: string | null,
    isLogin: boolean,
    isSupplier: boolean,
    status: Status,
}

export interface IRegister {
    email: string,
    password: string,
    confirmPassword: string,
    firstName: string,
    lastName: string,
}

export interface ILogin {
    email: string,
    password: string,
}