import {NextResponse} from "next/server";
import {getSession} from "@auth0/nextjs-auth0";
import User from "@/models/User";
import {connect} from "@/lib/db";

export async function POST(req) {
  try {
    const session = await getSession();
    if (!session || !session.user) {
      return NextResponse.json({error: "Not authenticated"}, {status: 401});
    }

    await connect();

    const {video} = await req.json();
    // Update user with video reference
    const updatedUser = await User.findOneAndUpdate(
      {auth0Id: session.user.sub},
      {video: video}
    );

    if (!updatedUser) {
      return NextResponse.json({error: "User not found"}, {status: 404});
    }

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Error adding video:", error);
    return NextResponse.json({error: "Internal server error"}, {status: 500});
  }
}
