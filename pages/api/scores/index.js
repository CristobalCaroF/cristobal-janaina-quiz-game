import dbConnect from "../../../db/dbConnect";
import Scores from "@/db/models/Scores";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const scores = await Scores.find();
    return response.status(200).json(scores);
  } else if (request.method === "POST") {
    const scores = await Scores.create({
      ...request.body,
      quiz: request.body.quizId,
    });

    return response.status(200).json(scores);
  } else {
    return response.status(405).json({ message: "Method not allowed" });
  }
}

// useSession
// getServerSession
