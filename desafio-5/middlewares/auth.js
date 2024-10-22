import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const auth = (req, res, next) => {
  try {
    const getToken = req.headers.authorization;
    if (!getToken) {
      res.status(403).json({ error: "user has no authorization token" });
    } else {
      const token = getToken.split(" ")[1];
      jwt.verify(token, process.env.SECRET_KEY, (err, payload) => {
        if (err) {
          res.status(403).json({ error: "authorization was denied" });
        }
        req.user = { id: payload.id, email: payload.email };
        console.log(payload);
        
        next();
      });
    }
  } catch (error) {
    next(error);
  }
};
