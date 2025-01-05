"use client";
import React, {use} from "react";
import Link from "next/link";
import {LogOut, Video, User} from "lucide-react";
import {useUser} from "@auth0/nextjs-auth0/client";

function Navbar() {
  const {user} = useUser();

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold">VideoGen</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md"
                >
                  Dashboard
                </Link>
                <Link
                  href="/create-video"
                  className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md flex items-center"
                >
                  <Video className="w-4 h-4 mr-2" />
                  Create Video
                </Link>
                <Link
                  href="/profile"
                  className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md flex items-center"
                >
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </Link>
                <a
                  href="/api/auth/logout"
                  className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md flex items-center"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </a>
              </>
            ) : (
              <a
                href="/api/auth/login"
                className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md"
              >
                Sign In
              </a>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
