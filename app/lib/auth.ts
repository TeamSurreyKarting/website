import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";
import { openDb } from '@/app/lib/dbOpen';
import bcrypt from 'bcrypt';

export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,

    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "jsmith@example.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const db = await openDb();

                const user = await db.get('SELECT * FROM Users WHERE Email = ?', [credentials?.email]);

                if (user && credentials?.password) {
                    const isPasswordValid = await bcrypt.compare(credentials.password, user.Password);

                    if (isPasswordValid) {
                        return {
                            id: user.user_id.toString(),
                            name: `${user.FirstName} ${user.LastName}`,
                            email: user.Email,
                        };
                    }
                }
                return null;
            }
        })
    ],

    pages: {
        signIn: '/auth/signin',
    },

    callbacks: {
        async redirect({ url, baseUrl }) {
            if (url.startsWith(baseUrl)) {
                return url;
            }
            return baseUrl;
        }
    }

};
