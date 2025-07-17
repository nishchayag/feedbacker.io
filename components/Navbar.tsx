"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { User } from "next-auth";
import { FaRegUserCircle, FaTimes, FaBars } from "react-icons/fa";
const Navbar = () => {
  const { data: session } = useSession();
  const currUser: User = session?.user as User;
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="sticky top-0 z-50 w-full bg-white shadow-md border-b border-gray-200 px-6 py-4">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold text-indigo-600 tracking-tight hover:tracking-wider transition-all duration-300"
        >
          FeedBacker.io
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-5">
          {session ? (
            <>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <FaRegUserCircle className="text-indigo-500 text-lg" />
                <span>
                  Welcome,{" "}
                  <span className="font-medium">
                    {currUser.name || currUser.email}
                  </span>
                </span>
              </div>

              <Link
                href="/dashboard"
                className="text-sm text-indigo-600 font-medium hover:text-indigo-800 hover:underline transition-all duration-300"
              >
                Dashboard
              </Link>

              <button
                onClick={() => signOut()}
                className="px-4 py-1.5 text-sm font-medium text-white bg-indigo-600 rounded-full shadow-sm hover:bg-indigo-700 hover:shadow-md transition-all duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="px-4 py-1.5 text-sm font-medium text-white bg-indigo-600 rounded-full shadow-sm hover:bg-indigo-700 hover:shadow-md transition-all duration-300"
            >
              Sign In
            </Link>
          )}
        </div>

        {/* Burger Icon */}
        <button
          className="md:hidden text-indigo-600 text-2xl focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-4 p-4 rounded-xl bg-white/90 backdrop-blur-lg border border-gray-200 shadow-xl animate-fade-in-down flex flex-col gap-4">
          {session ? (
            <>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <FaRegUserCircle className="text-indigo-500 text-lg" />
                <span>
                  Welcome,{" "}
                  <span className="font-medium">
                    {currUser.name || currUser.email}
                  </span>
                </span>
              </div>

              <Link
                href="/dashboard"
                className="text-sm text-indigo-600 font-medium hover:text-indigo-800 hover:underline transition"
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </Link>

              <button
                onClick={() => {
                  signOut();
                  setIsOpen(false);
                }}
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-full shadow hover:bg-indigo-700 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-full shadow hover:bg-indigo-700 transition"
              onClick={() => setIsOpen(false)}
            >
              Sign In
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
