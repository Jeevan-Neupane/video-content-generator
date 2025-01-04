import {connect} from "@/lib/db";
import User from "@/models/User";
import {NextResponse} from "next/server";
import {getSession} from "@auth0/nextjs-auth0";

export async function GET(request) {
  try {
    const session = await getSession();
    if (!session?.user) {
      return NextResponse.json({error: "Not authenticated"}, {status: 401});
    }

    const auth0Id = session.user.sub;

    await connect();
    const user = await User.findOne({auth0Id});

    if (!user) {
      return NextResponse.json({error: "User not found"}, {status: 404});
    }

    return NextResponse.json(user, {status: 200});
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({error: "Internal server error"}, {status: 500});
  }
}
