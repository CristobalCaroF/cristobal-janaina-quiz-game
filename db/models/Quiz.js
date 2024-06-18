import mongoose from "mongoose";

const { Schema } = mongoose;

const quizSchema = new Schema({
  name: { type: String, required: true },
  amountQuestions: { type: Number, required: true },
  imageUrl: { type: String, required: true },
});

const Quiz = mongoose.models.Quiz || mongoose.model("Quiz", quizSchema);

export default Quiz;
