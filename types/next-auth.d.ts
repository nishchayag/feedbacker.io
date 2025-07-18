import "next-auth";

declare module "next-auth" {
  interface User {
    _id?: string;
    name: string;
    email: string;
    username?: string;
    isVerified?: boolean;
    isAcceptingMessages?: boolean;
  }

  interface Session {
    user: {
      _id?: string;
      isVerified?: boolean;
      isAcceptingMessages?: boolean;
      username?: string;
      name?: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    _id?: string;
    isVerified?: boolean;
    isAcceptingMessages?: boolean;
    username?: string;
    name?: string;
  }
}
