import { Router } from "express";
import { getRandomKey } from "../services/keysServices.js";

const router = Router();

// GET /api/keys
router.get("/", async (req, res) => {
  const key = await getRandomKey();
  if (key) {
    res.json({
      success: true,
      key: key.key,
    });
  } else {
    res.status(404).json({
      success: false,
      message: "No keys found",
    });
  }
});

export default router;
