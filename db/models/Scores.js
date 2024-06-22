import mongoose from "mongoose";
import Quiz from "./Quiz";
import User from "./User";

const { Schema } = mongoose;

const QuizSchema = Quiz;
const UserSchema = User;

const scoresSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  score: { type: Number, required: true },
  date: { type: String, required: true },
  quiz: { type: Schema.Types.ObjectId, ref: "Quiz", required: true },
});

const Scores = mongoose.models.Scores || mongoose.model("Scores", scoresSchema);

export default Scores;
