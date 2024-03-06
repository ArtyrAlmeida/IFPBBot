export interface IUser {
    name: string;
    email: string;
    password: string;
    _id?: string;
}

export interface ILoginInfo {
    email: string;
    password: string;
}