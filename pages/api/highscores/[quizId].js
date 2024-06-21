import dbConnect from "../../../db/dbConnect";
import Scores from "@/db/models/Scores";

export default async function handler(request, response) {
  await dbConnect();
  const selectedQuizId = request.query.quizId;

  if (request.method === "GET") {
    let scores = await Scores.find({ quiz: selectedQuizId })
      .sort({ score: -1 })
      .limit(10)
      .populate("user")
      .lean();

    scores = scores.map((score) => {
      return { ...score, user: score.user.gitUsername };
    });

    return response.status(200).json(scores);
  } else {
    return response.status(405).json({ message: "Method not allowed" });
  }
}
