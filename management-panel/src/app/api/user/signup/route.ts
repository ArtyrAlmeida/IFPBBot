import { IUser } from "@/interfaces";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

import { userAlreadyExists, userHasAllProperties } from "@/validators/userValiidator";
import User from "@/models/User";
import connectDb from "@/libs/database";


const POST = async (req: NextRequest) => {
    await connectDb();
    const user: IUser = await req.json();
    if (!userHasAllProperties(user)) return NextResponse.json({ message: "User is missing arguments" }, { status: 400 });
    if (await userAlreadyExists(user)) return NextResponse.json({  message: "User already exists" }, { status: 400 });

    const { name, email, password } = user;
        
    try {
        const hashPassword = getHash(password);
        
        const response = await User.create({ ...user, password: hashPassword });
        const id = response._id.toString()!;
    
        return NextResponse.json({ name, email, id }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "Could not create user" }, { status: 400 });
    }
}

const getHash = (password: string) => {
    const passwordSalt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, passwordSalt);
}

export { POST }