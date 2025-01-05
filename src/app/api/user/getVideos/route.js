import {NextResponse} from "next/server";
import Video from "@/models/Video";
import {connect} from "@/lib/db";

export async function GET() {
  try {
    await connect();

    const videos = await Video.find().populate("userId", "name");

    return NextResponse.json(videos, {status: 200});
  } catch (error) {
    console.log(error);
    return NextResponse.json({error: "Failed to fetch videos"}, {status: 500});
  }
}
