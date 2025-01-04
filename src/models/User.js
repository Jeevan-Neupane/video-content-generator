import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    auth0Id: {
      type: String,
      required: [true, "Auth0 ID is required"],
      unique: true,
    },
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    video: {
      type: String,
      required: false,
    },
    videos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video",
        required: false,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
