import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";


const options: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {},
            async authorize(credentials, req) {
                const { email, password, ...additionalInfo } = credentials as {
                    email: string,
                    password: string
                }

                console.log(credentials);
                

                const res = await fetch("/your/endpoint", {
                    method: 'POST',
                    body: JSON.stringify({ email, password }),
                    headers: { "Content-Type": "application/json" }
                  })
                  const user = await res.json()
            
                  // If no error and we have user data, return it
                  if (res.ok && user) {
                    return user
                  }
                  // Return null if user data could not be retrieved
                  return null
            }
        })
    ],
    pages: {
        signIn: "/user/login"
    }
}

export { options }; 