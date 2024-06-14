import dbConnect from "@/db/dbConnect";
import Scores from "@/db/models/Scores";

export default async function handler(request, response) {
  if (request.method === "GET") {
    await dbConnect();
    const scores = await Scores.find({
      username: request.query.username,
    }).exec();

    return response.status(200).json(scores);
  }
  return response.status(405).json({ message: "Method not allowed" });
}
