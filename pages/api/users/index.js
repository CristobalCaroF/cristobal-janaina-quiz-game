import dbConnect from "@/db/dbConnect";
import Register from "@/db/models/Register";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "POST") {
    try {
      const registerData = request.body;
      await Register.create(registerData);

      response.status(201).json({ status: "User created" });
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  }
}
