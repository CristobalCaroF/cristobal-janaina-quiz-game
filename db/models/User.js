import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  gitUsername: { type: String, required: false },
  image: { type: Buffer },
  imageSize: { type: Number },
  imageMimeType: { type: String },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
