import jwt from "jsonwebtoken";

const signToken = async (id: string, expiresIn: string) => {
    return jwt.sign({id}, process.env.SECRET as string, {expiresIn})
}

export default signToken;