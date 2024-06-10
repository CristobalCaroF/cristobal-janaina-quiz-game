import dbConnect from "@/db/dbConnect";
import User from "@/db/models/User";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "POST") {
    const { username, password, email } = request.body;
    const { db } = User;
    const user = await db.collection("users").findOne({ username });

    if (user) {
      // Usuário já existe
      response.status(409).json({ message: "User already exists" });
    } else {
      // Registrar novo usuário
      await db.collection("users").insertOne({ username, password, email });
      response.status(201).json({ message: "User registered successfully" });
    }
  } else {
    response.status(405).json({ message: "Method not allowed" });
  }
}
