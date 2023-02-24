import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const { JWT_SECRET_KEY } = process.env;
export const Admin = (req, res, next) => {
  const headers = req.headers[`authorization`];

  const token = headers.split(" ")[1];

  if (!token) {
    return res
      .status(404)
      .json({ message: "access rejected  no token found................" });
  }
  jwt.verify(String(token), JWT_SECRET_KEY, async (err, token) => {
    if (err) {
      return res.status(404).json({
        message:
          "Wrong or Invalid Token Please Check Your authorized................",
      });
    }

    req.user = token;
    req.role = token.role;
  });

  if (req.role === "admin") {
    next();
  } else {
    return res
      .status(403)
      .json({
        message: " your access denied you are not admin not authorized................",
      });
  }
};
