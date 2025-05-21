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
