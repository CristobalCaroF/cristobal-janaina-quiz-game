import dbConnect from "@/db/dbConnect";
import User from "@/db/models/User";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "POST") {
    try {
      const registerData = request.body;
      console.log("registerData", registerData);
      const register = new User(registerData);
      await register.save();
      return response.status(201).json({ status: "Register created." });
    } catch (error) {
      console.log(error);
      response.status(404).json({ error: error.message });
    }
  }
}
