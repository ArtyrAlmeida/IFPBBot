import bcrypt from "bcrypt";
import { ILoginInfo, IUser } from "@/interfaces";

import connectDb from "@/libs/database";
import User from "@/models/User";
import { loginHasAllProperties } from "@/validators/userValiidator";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const login = async (user: ILoginInfo) => {
    await connectDb();

    const dbUser = await User.findOne({ email: user.email });

    if (!dbUser) throw new Error("Não existe um usuário cadastrado com esse email");

    const match = await bcrypt.compare(user.password, dbUser.password);

    if(match) {
        const { email, name, _id } = dbUser as IUser;
        const id = _id!.toString();
        return { name, email, id }
    }

    throw new Error("Senha incorreta");
}


const options: AuthOptions = {

    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "email", type: "text" },
                password: { label: "password", type: "text" }
            },
            async authorize(credentials, req) {
                try {
                    if(!loginHasAllProperties(credentials)) throw new Error("Todos os campos devem ser preenchidos");
                    const user = login(credentials as ILoginInfo);
                    return user;
                } catch (error) {
                    console.log("erro");
                    console.log(error)
                    return null;
                }
            }
        })
    ],
    pages: {
        signIn: "/user/login"
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.name = user.name;
                token.email = user.email;
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.name = token.name as string;
                session.user.email = token.email as string;
                session.user.id = token.id as string;
            }
            return session;
        }
    }
}

export { options }; 