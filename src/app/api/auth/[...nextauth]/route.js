import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import prisma from "@/lib/prisma"
import { signIn } from "next-auth/react"

export const authOptions = {
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "text" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) {
					// throw new Error("Email and password are required.")
					return null
				}
				const user = await prisma.user.findUnique({
					where: { email: credentials.email },
				})
				if (!user) {
					// throw new Error("Invalid email or password.")
					return null
				}
				const isPasswordValid = await bcrypt.compare(credentials.password, user.password)
				if (!isPasswordValid) {
					// throw new Error("Invalid email or password.")
					return null
				}
				return {
					id: user.id,
					email: user.email,
				}
			},
		}),
	],
	session: {
		strategy: "jwt",
	},
	pages: {
		signIn: "/login",
		//signIn: "/auth/signin", // Customize your sign-in page if necessary
	},
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id
				token.email = user.email
			}
			return token
		},
		async session({ session, token }) {
			if (token) {
				session.user.id = token.id
				session.user.email = token.email
			}
			return session
		},
	},
	secret: process.env.NEXTAUTH_SECRET, // || "your_secret_key", // Optional, specify a JWT secret
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
