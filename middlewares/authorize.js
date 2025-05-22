import { isKeyDatabase } from "../services/keysServices.js";

export async function authorizeKey(req, res, next) {
  const { key } = req.query;
  if (key) {
    const keyExists = await isKeyDatabase(key);
    if (keyExists) {
      next();
    } else {
      next.status(400).json({
        status: false,
        message: "Invalid key",
      });
    }
  } else {
    next.status(400).json({
      status: false,
      message: "Key not provided",
    });
  }
}

export async function authorizeKeyMiddleware(req, res, next) {
  if (global.user) {
    next();
  } else {
    res.status(403),
      next({
        status: false,
        message: "Unauthorized user ",
      });
  }
}
