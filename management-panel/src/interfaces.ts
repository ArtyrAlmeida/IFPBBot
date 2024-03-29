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

export interface ITextAnswer {
    name: string;
    text: string;
    _id?: string;
}

export interface IChartAnswer {
    name: string;
    chart: Blob;
    _id?: string;
}