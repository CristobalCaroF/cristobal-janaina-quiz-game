import dbConnect from "../../../db/dbConnect";
import Quiz from "../../../db/models/Quiz";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const quiz = await Quiz.find();

    return response.status(200).json(quiz);
  } else {
    return response.status(405).json({ message: "Method not allowed" });
  }
}
