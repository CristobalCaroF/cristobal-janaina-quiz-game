import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  userId: { type: String, required: true },
  password: { type: Number, required: true },
  email: { type: String, required: true },
  image: { type: Buffer },
  imageSize: { type: Number },
  imageMimeType: { type: String },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
