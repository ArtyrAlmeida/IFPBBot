import { ILoginInfo, IUser } from "@/interfaces";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

import signToken from "@/utils/signToken"

import { loginHasAllProperties } from "@/validators/userValiidator";
import User from "@/models/User";
import connectDb from "@/libs/database";


const POST = async (req: NextRequest) => {
    await connectDb();
    const user: ILoginInfo = await req.json();
   
    if (!loginHasAllProperties(user)) return NextResponse.json({ message: "Faltam informações para o login" }, { status: 400 });
    try {
        const dbUser = await User.findOne({ email: user.email });
    
        if (!dbUser) return NextResponse.json({ message: "Não existe um usuário cadastrado com esse email" }, { status: 404 });
    
        const match = await bcrypt.compare(user.password, dbUser.password);
    
        if(match) {
            const { email, name, _id } = dbUser;
            const id = _id.toString();
            const token = await signToken(id, "5d");
            return NextResponse.json({ name, email, id, token }, { status: 201 });
        }
    
        return NextResponse.json({ message: 'Credenciais erradas' }, { status: 401 });
    } catch (error) {
        return NextResponse.json({ message: 'Não foi possível fazer login' }, { status: 400 });
    }
    
}

export { POST }