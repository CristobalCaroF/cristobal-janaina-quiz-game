import dbConnect from "@/db/dbConnect";
import Question from "@/db/models/Questions";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const question = await Question.find({ quizId: request.query.quizId });

    return response.status(200).json(question);
  } else {
    return response.status(405).json({ message: "Method not allowed" });
  }
}
