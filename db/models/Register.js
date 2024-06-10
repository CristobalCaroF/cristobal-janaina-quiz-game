import mongoose from "mongoose";

const { Schema } = mongoose;

const registerSchema = new Schema({
  username: { type: String, required: true },
  password: { type: Number, required: true },
  email: { type: String, required: true },
});

const Register =
  mongoose.models.Register || mongoose.model("Register user", registerSchema);

export default Register;
