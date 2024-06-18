import dbConnect from "@/db/dbConnect";
import User from "@/db/models/User";

export default async function handler(req, res) {
  if (["GET", "POST"].includes(req.method)) {
    await dbConnect();
    const user = await User.findOne({ userId: req.query.userId }).exec();
    if (user) {
      switch (req.method) {
        case "POST":
          const { size, mimeType, image } = req.body.avatar;
          user.image = image;
          user.imageSize = size;
          user.imageMimeType = mimeType;

          user.save();
          res.status(201);
          break;

        case "GET":
          res.appendHeader("Content-Type", user.imageMimeType);
          res.appendHeader("Content-Length", user.imageSize);

          res.status(200).send(user.image);
      }
    } else {
      res.status(404);
    }
  }
  res.end();
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb", // Set desired value here
    },
  },
};
