import authOptions from "@/lib/nextAuthOptions";
import NextAuth from "next-auth";

const authHandler = NextAuth(authOptions);

export { authHandler as POST, authHandler as GET };
