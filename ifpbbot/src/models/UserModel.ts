import { Model, Schema, model } from "mongoose";
import { User } from "../types";


interface UserModel extends Model<User> {
    findOrCreate: (to: string, name: string) => User;
};

const userSchema = new Schema<User, UserModel>({
    phoneNumber: {
        type: String,
        required: true,       
    }, 
    name: {
        type: String,
        required: true
    }
});

userSchema.static("findOrCreate", async function findOrCreate(to: string, name: string) {
    const existingUser = await this.find({ phoneNumber: to });
    if (existingUser) return existingUser;

    const newUser = await this.create({
        name,
        phoneNumber: to,
    });

    return newUser;
});

const UserModel = model<User, UserModel>("users", userSchema);

export { UserModel }