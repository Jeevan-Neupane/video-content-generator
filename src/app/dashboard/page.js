"use client";
import React, {useEffect, useState} from "react";
import {useUser} from "@auth0/nextjs-auth0/client";
import {Loader2, Play, Calendar, Clock} from "lucide-react";
import axios from "axios";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import Link from "next/link";

function Page() {
  const {user, error, isLoading} = useUser();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Dummy videos data
  const dummyVideos = [
    {
      id: 1,
      title: "Welcome Video",
      url: "https://example.com/video1.mp4",
      thumbnail: "https://picsum.photos/300/200",
      date: "2024-01-15",
      duration: "2:30",
    },
    {
      id: 2,
      title: "Product Demo",
      url: "https://example.com/video2.mp4",
      thumbnail: "https://picsum.photos/300/200",
      date: "2024-01-14",
      duration: "4:15",
    },
    {
      id: 3,
      title: "Tutorial Video",
      url: "https://example.com/video3.mp4",
      thumbnail: "https://picsum.photos/300/200",
      date: "2024-01-13",
      duration: "3:45",
    },
  ];

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

  if (!user) {
    router.push("/");
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-gray-50 to-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Your Videos
          </h1>
          <Button
            onClick={() => router.push("/create-video")}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
          >
            Create New Video
          </Button>
        </div>

        {dummyVideos.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">
              You haven't created any videos yet
            </p>
            <Button
              onClick={() => router.push("/create-video")}
              className="bg-gradient-to-r from-purple-600 to-blue-600"
            >
              Create Your First Video
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dummyVideos.map((video) => (
              <Link
                key={video.id}
                href={`/video/${video.id}`}
                className="border bg-white rounded-lg overflow-hidden group hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Play className="w-12 h-12 text-white" />
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2 text-gray-800">
                    {video.title}
                  </h3>
                  <div className="flex items-center gap-4 text-gray-500 text-sm">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{video.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{video.duration}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Page;
