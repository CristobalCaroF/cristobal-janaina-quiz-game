import dbConnect from "@/db/dbConnect";
import User from "@/db/models/User";

export default async function handler(req, res) {
  await dbConnect();
  if (["GET", "POST", "DELETE"].includes(req.method)) {
    const user = await User.findOne({ _id: req.query.userId }).exec();
    if (user) {
      switch (req.method) {
        case "POST":
          const { size, mimeType, image } = req.body;
          user.image = Buffer(image, "base64");
          user.imageSize = size;
          user.imageMimeType = mimeType;

          user.save();
          res.status(201);
          break;

        case "GET":
          if (user.image) {
            res.appendHeader("Content-Type", user.imageMimeType);
            res.appendHeader("Content-Length", user.imageSize);

            res.status(200).send(user.image);
          } else {
            res.redirect(302, req.query.github);
          }
          break;

        case "DELETE":
          User.updateOne(
            { _id: req.query.userId },
            { $unset: { image: "", imageSize: "", imageMimeType: "" } }
          ).exec();
          res.status(200);
          break;
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
