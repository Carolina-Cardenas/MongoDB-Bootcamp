import { Router } from "express";

const router = Router();

//get logaout
router.get("/", (req, res) => {
  res.json("Post");
});
