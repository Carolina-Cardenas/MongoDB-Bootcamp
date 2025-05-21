import { Router } from "express";
import { authorizeKey } from "../middlewares/authorize.js";

const router = Router();

//middleware
router.use(authorizeKey);

//get logaout
router.get("/logout", (req, res) => {
  res.json("logout");
});

export default router;
