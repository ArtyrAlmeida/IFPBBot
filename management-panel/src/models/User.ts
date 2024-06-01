import { IUser } from "@/interfaces";
import mongoose, { Schema } from "mongoose";

const userSchema = new Schema<IUser>({
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    }
});

const User = mongoose.models.users || mongoose.model("managers", userSchema);

export default User;
