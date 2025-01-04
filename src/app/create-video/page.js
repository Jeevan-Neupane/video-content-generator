"use client";
import {useUser} from "@auth0/nextjs-auth0/client";
import axios from "axios";
import React, {useEffect, useState} from "react";
import {Card, CardHeader, CardContent, CardFooter} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Plus, Loader2} from "lucide-react";
import {VideoUploadDropzone} from "@/components/video-uploader";
import {useRouter} from "next/navigation";

function Page() {
  const {user, error, isLoading} = useUser();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [script, setScript] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (user) {
      try {
        setLoading(true);
        axios.get(`/api/user/getUser`).then((res) => {
          setUserData(res.data);
          setLoading(false);
        });
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }
  }, [user]);

  const handleClick = () => {
    console.log(script);
  };

  if (isLoading || loading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-50">
        <Card className="w-[350px] shadow-lg">
          <CardHeader>
            <h2 className="text-2xl font-bold text-center text-red-600">
              Error
            </h2>
          </CardHeader>
          <CardContent>
            <p className="text-center text-gray-600">{error.message}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-50 p-4">
      {userData && (
        <div className="w-full max-w-3xl">
          <Card className="shadow-lg">
            <CardHeader>
              <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                {userData?.video ? "Create Your AI Video" : "Let's Get Started"}
              </h2>
              <p className="text-gray-600 text-center mt-2">
                {userData?.video
                  ? "Transform your script into a personalized video using AI"
                  : "Upload a video to create your digital avatar"}
              </p>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              {userData?.video ? (
                <div className="space-y-6">
                  <div className="">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Script
                    </label>
                    <textarea
                      value={script}
                      onChange={(e) => setScript(e.target.value)}
                      className="w-full min-h-[200px] p-4 border rounded-lg"
                      placeholder="Enter your script here. Be creative! Your AI avatar will bring these words to life..."
                    />
                  </div>
                  <div className="flex justify-center">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg transition-all duration-200 transform hover:scale-105"
                      disabled={!script.trim()}
                      onClick={handleClick}
                    >
                      <Plus className="w-5 h-5 mr-2" />
                      Generate Video
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <VideoUploadDropzone />
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

export default Page;
