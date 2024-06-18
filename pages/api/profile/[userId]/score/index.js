import dbConnect from "@/db/dbConnect";
import Scores from "@/db/models/Scores";

export default async function handler(request, response) {
  if (request.method === "GET") {
    await dbConnect();
    console.log("request.query.userId", request.query.userId);
    const scores = await Scores.find({
      userId: request.query.userId,
    });
    console.log("SCORES", scores);
    return response.status(200).json(scores);
  }
  return response.status(405).json({ message: "Method not allowed" });
}
