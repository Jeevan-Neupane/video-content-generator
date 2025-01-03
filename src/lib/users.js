import {connect} from "@/lib/db";
import User from "@/models/User";

export async function addUserIfNotExists(user) {
  if (!user) return null;

  try {
    await connect();

    const existingUser = await User.findOne({auth0Id: user.sub});

    if (existingUser) {
      return existingUser;
    }

    const newUser = await User.create({
      email: user.email,
      name: user.name,
      auth0Id: user.sub,
    });

    return newUser;
  } catch (error) {
    console.error("Error adding user:", error);
    throw error;
  }
}
