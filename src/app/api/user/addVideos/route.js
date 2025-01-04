import {NextResponse} from "next/server";
import Video from "@/models/Video";
import {getSession} from "@auth0/nextjs-auth0";
import User from "@/models/User";
import {connect} from "@/lib/db";

export async function POST(request) {
  try {
    await connect();

    const session = await getSession();
    if (!session || !session.user) {
      return NextResponse.json({error: "Not authenticated"}, {status: 401});
    }

    const body = await request.json();
    const {title, description, videoUrl} = body;
    if (!title || !description || !videoUrl) {
      return NextResponse.json(
        {message: "All fields are required"},
        {status: 401}
      );
    }

    const user = await User.findOne({auth0Id: session.user.sub});

    const newVideo = new Video({
      userId: user._id,
      title,
      description,
      videoUrl,
    });

    const savedVideo = await newVideo.save();

    return NextResponse.json(
      {message: "Video added successfully", video: savedVideo},
      {status: 201}
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {message: "Failed to add video", error: error.message},
      {status: 500}
    );
  }
}
