import mongoose from "mongoose";

const { Schema } = mongoose;

const scoresSchema = new Schema({
  //   correctAnswers: { type: Number, required: true },
  // wrongAnswers: { type: Number, required: true },
  userId: { type: String, required: true },
  score: { type: Number, required: true },
  date: { type: String, required: true },
  quizId: { type: String, required: false },
});

const Scores = mongoose.models.Scores || mongoose.model("Scores", scoresSchema);

export default Scores;
