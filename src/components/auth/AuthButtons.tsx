"use client";

import { useAuth } from "@clerk/nextjs";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import Link from "next/link";

const AuthButtons = () => {
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return (
      <Link
        href="/dashboard"
        className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-blue-500 text-white font-medium rounded-lg hover:shadow-lg transition-all duration-300"
      >
        Dashboard
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <SignInButton mode="modal">
        <button className="text-gray-600 font-medium hover:text-indigo-600 transition-colors duration-300">
          Sign in
        </button>
      </SignInButton>
      <SignUpButton mode="modal">
        <button className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-blue-500 text-white font-medium rounded-lg hover:shadow-lg transition-all duration-300">
          Get started
        </button>
      </SignUpButton>
    </div>
  );
};

export default AuthButtons;
