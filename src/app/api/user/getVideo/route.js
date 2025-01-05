import {NextResponse} from "next/server";
import Video from "@/models/Video";
import {connect} from "@/lib/db";

export async function GET(request) {
  try {
    // Connect to database
    await connect();

    const {searchParams} = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({error: "Video ID is required"}, {status: 400});
    }

    const video = await Video.findById(id).populate("userId", "name");

    if (!video) {
      return NextResponse.json({error: "Video not found"}, {status: 404});
    }

    return NextResponse.json(video, {status: 200});
  } catch (error) {
    console.error("Error fetching video:", error);
    return NextResponse.json({error: "Internal server error"}, {status: 500});
  }
}
