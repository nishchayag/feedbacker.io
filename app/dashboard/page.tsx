"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
const Page = () => {
  const { data: session } = useSession();
  return (
    <div>
      hi {session?.user?.name}
      <button onClick={() => signOut()}>Logout</button>
    </div>
  );
};

export default Page;
