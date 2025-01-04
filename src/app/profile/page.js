"use client";
import React, {useEffect, useState} from "react";
import {useUser} from "@auth0/nextjs-auth0/client";
import {Button} from "@/components/ui/button";
import {Loader2, LogOut, Mail, User as UserIcon} from "lucide-react";
import axios from "axios";

function Page() {
  const {user, error, isLoading} = useUser();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      try {
        setLoading(true);
        axios.get(`/api/user/getUser?auth0Id=${user?.sub}`).then((res) => {
          setUserData(res.data);
        });
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }
  }, [user]);

  if (isLoading || loading)
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-md w-[350px]">
          <div className="text-red-500 text-center">{error.message}</div>
        </div>
      </div>
    );

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="mb-8">
            <div className="flex items-center justify-center mb-4">
              {user.picture ? (
                <img
                  src={user.picture}
                  alt={user.name}
                  className="w-24 h-24 rounded-full shadow-lg"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
                  <UserIcon className="w-12 h-12 text-gray-400" />
                </div>
              )}
            </div>
            <h2 className="text-2xl font-bold text-center">{user.name}</h2>
            <p className="text-lg text-center text-gray-900">{user.email}</p>
            <div className="flex justify-center mt-3">
              <Button variant="destructive" asChild>
                <a href="/api/auth/logout" className="flex items-center gap-2">
                  <LogOut className="w-4 h-4" /> Sign Out
                </a>
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            {userData?.video && (
              <div className="pt-6">
                <h3 className="text-lg font-semibold mb-4">Your Video</h3>
                <div className="bg-black rounded-lg overflow-hidden shadow-lg">
                  <video className="w-full" controls src={userData.video} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
