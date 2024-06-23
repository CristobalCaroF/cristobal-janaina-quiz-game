import dbConnect from "@/db/dbConnect";
import User from "@/db/models/User";

export default async function handler(req, res) {
  await dbConnect();
  if (req.method === "GET") {
    const user = await User.findOne({ _id: req.query.userId }).exec();
    res.status(user?.image ? 200 : 204);
  }
  res.end();
}
