import mongoose from "mongoose";

const { Schema } = mongoose;

const questionSchema = new Schema({
  question: { type: String, required: true },
  answers: { type: Array, required: true },
  correct: { type: String, required: true },
  quizId: { type: String, required: true },
});

const Question =
  mongoose.models.Question || mongoose.model("Question", questionSchema);

export default Question;
