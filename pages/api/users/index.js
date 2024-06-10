import dbConnect from "@/db/dbConnect";
import User from "@/db/models/User";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "POST") {
    const { username, password } = request.body;
    const { db } = User;
    const user = await db.collection("users").findOne({ username });

    if (user) {
      // Usuário já existe
      response.status(409).json({ message: "User already exists" });
    } else {
      // Registrar novo usuário
      await db.collection("users").insertOne({ username, password });
      response.status(201).json({ message: "User registered successfully" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}

//       console.log("registerData", registerData);
//       const register = new User(registerData);
//       await register.save();
//       return response.status(201).json({ status: "Register created." });
//     } catch (error) {
//       console.log(error);
//       response.status(404).json({ error: error.message });
//     }
//   }
//
