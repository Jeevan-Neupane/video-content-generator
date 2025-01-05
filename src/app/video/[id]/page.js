"use client";
import {formatDate} from "@/lib/utils";
import axios from "axios";
import {useParams} from "next/navigation";
import React, {useEffect, useState} from "react";
function page() {
  const {id} = useParams();
  const [video, setVideo] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/user/getVideo?id=${id}`)
      .then((res) => {
        console.log(res.data);
        setVideo(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto bg-white px-4 py-8">
        {video && (
          <div>
            <div className="rounded-lg overflow-hidden shadow-lg mt-4">
              <video
                className="w-full aspect-video"
                controls
                src={video?.videoUrl}
              />
            </div>
            <div className="py-6">
              <h2 className="text-2xl font-bold">{video?.title}</h2>
              <p className="text-gray-600 text-sm">
                {formatDate(video?.createdAt)}
              </p>
              <p className="text-gray-600 text-sm font-bold mb-4">
                {video?.userId?.name}
              </p>
              <p className="text-gray-800">{video?.description}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default page;
