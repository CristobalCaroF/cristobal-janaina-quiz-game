import dbConnect from "@/db/dbConnect";
import Scores from "@/db/models/Scores";

export default async function handler(request, response) {
  await dbConnect();
  if (request.method === "GET") {
    console.log("request.query.userId", request.query.userId);
    const scores = await Scores.find({
      user: request.query.userId,
    }).populate("quiz");
    console.log("SCORES", scores);
    return response.status(200).json(scores);
  }
  return response.status(405).json({ message: "Method not allowed" });
}
