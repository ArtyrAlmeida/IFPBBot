import { User } from "@/interfaces";
import bcrypt from "bcrypt";
import { userHasAllProperties } from "@/validators/userValiidator";
import { NextRequest, NextResponse } from "next/server";

const User = { create(user: User) { return { _id: "" } } }

const POST = async (req: NextRequest) => {
    const user: User = await req.json();
    if (!userHasAllProperties(user)) return NextResponse.json({ message: "User is missing arguments" }, { status: 400 });

    const { name, email, password } = user;
        
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    
    const response = await User.create({ ...user, password: hash });
    const id = response._id!;
    const token = await signToken(id);
    return { name, email, token, id };
}

const signToken = (id: string) => null;