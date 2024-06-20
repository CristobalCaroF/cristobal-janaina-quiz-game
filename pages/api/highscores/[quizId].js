import dbConnect from "../../../db/dbConnect";
import Scores from "@/db/models/Scores";

export default async function handler(request, response) {
  await dbConnect();
  const selectedQuizId = request.query.quizId;

  if (request.method === "GET") {
    console.log("request.query.quizId", request.query.quizId);
    const selectedQuizScores = Scores.find({ quiz: selectedQuizId });
    const scores = await selectedQuizScores
      .find()
      .sort({ score: -1 })
      .limit(10);

    return response.status(200).json(scores);
  } else {
    return response.status(405).json({ message: "Method not allowed" });
  }
}
