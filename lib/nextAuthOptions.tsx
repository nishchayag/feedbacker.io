import userModel from "@/models/user.model";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "@/lib/connectDB";
import bcrypt from "bcryptjs";
const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        identifier: {
          label: "Email/Username",
          type: "text",
          placeholder: "your-email-or-username",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "your-password",
        },
      },
      async authorize(credentials) {
        const { identifier, password } = credentials as {
          identifier: string;
          password: string;
        };
        if (!identifier || !password) {
          throw new Error("Email/Username and password are required");
        }
        await connectDB();
        try {
          const userInDB = await userModel.findOne({
            $or: [{ email: identifier }, { username: identifier }],
          });
          if (!userInDB) {
            throw new Error("No user found with the provided email/username");
          } else {
            const isPasswordValid = await bcrypt.compare(
              password,
              userInDB.password
            );
            if (!isPasswordValid) {
              throw new Error(
                "Invalid username/email - password combination, Please try again"
              );
            }
            if (!userInDB.isVerified) {
              throw new Error("Please verify your email before logging in");
            }
            return userInDB;
          }
        } catch (error: unknown) {
          console.error("Error during authorization:", error);
          throw new Error((error as Error).message);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id?.toString();
        token.isVerified = user.isVerified;
        token.isAcceptingMessages = user.isAcceptingMessages;
        token.username = user.username;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user._id = token._id;
        session.user.isVerified = token.isVerified;
        session.user.isAcceptingMessages = token.isAcceptingMessages;
        session.user.username = token.username;
        session.user.name = token.name;
      }
      return session;
    },
  },
  pages: {
    signIn: "/Login",
  },

  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default authOptions;
