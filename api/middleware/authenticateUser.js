import CustomError from "../error/index.js";
import { isTokenValid } from "../utils/jwt.js";

const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token;
  if (!token) {
    return res.status(401).json({ error: "Not logged in" });
  }

  try {
    const { username, userId } = isTokenValid({ token });
    req.user = { username, userId };
    next();
  } catch (error) {
    return res.status(401).json({ error: "Authentication Invalid" });
  }
};

const authUserPlusAnonymous = async (req, res, next) => {
  const token = req.signedCookies.token;
  if (token) {
    const { username, userId } = isTokenValid({ token });
    req.user = { username, userId };
  }
  next();
};

export { authenticateUser, authUserPlusAnonymous };
