import mongoose from "mongoose";
import Quiz from "./Quiz";

const { Schema } = mongoose;

const QuizSchema = Quiz;
const scoresSchema = new Schema({
  //   correctAnswers: { type: Number, required: true },
  // wrongAnswers: { type: Number, required: true },
  userId: { type: String, required: true },
  score: { type: Number, required: true },
  date: { type: String, required: true },
  quiz: { type: Schema.Types.ObjectId, ref: "Quiz", required: true },
});

const Scores = mongoose.models.Scores || mongoose.model("Scores", scoresSchema);

export default Scores;
