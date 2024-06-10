import dbConnect from "@/db/dbConnect";
import User from "@/db/models/User";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "POST") {
    const { username, password } = request.body;
    const { db } = User;
    const user = await db.collection("users").findOne({ username });

    if (user && user.password === password) {
      response.status(200).json({ userId: user._id });
    } else {
      response.status(401);
    }
  }
}
