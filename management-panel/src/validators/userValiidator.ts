import { User } from "@/interfaces";

export const userHasAllProperties = (user: User) => {
    return user.email 
        && user.name 
        && user.password;
}