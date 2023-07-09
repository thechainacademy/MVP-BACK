import jwt from "jsonwebtoken";

export default async function isAuhtenticatedMiddleware(req, res, next) {
  try {
    const token = req.header("Authorization");
    const secret = process.env.SECRET_TOKEN;

    if (!token)
      return res
        .status(401)
        .json({ message: "You must be logged to continue" });

    const validToken = token.split(" ")[1];
    const data = jwt.verify(validToken, secret);
    res.locals = data.user;

    next();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
}
