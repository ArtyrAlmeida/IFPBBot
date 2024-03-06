import { ILoginInfo, IUser } from "@/interfaces";
import User from "@/models/User";

export const userHasAllProperties = (user: any) => {
    return user.email 
        && user.name 
        && user.password;
}

export const loginHasAllProperties = (user: any) => {
    return user.email
        && user.password;
}

export const userAlreadyExists = async (user: ILoginInfo) => {
    const { email } = user;
    const dbUser = await User.findOne({ email });

    return dbUser ? true : false;
}