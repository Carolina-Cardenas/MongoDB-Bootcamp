import { Router } from "express";
import { authorizeKey } from "../middlewares/authorize.js";

const router = Router();

// Middleware global para esta ruta
router.use(authorizeKey);

// GET all posts
router.get("/", (req, res) => {
  res.json("get all posts");
});

// POST new post
router.post("/", (req, res) => {
  res.json("post new post");
});

// PUT a post (ejemplo básico)
router.put("/:id", (req, res) => {
  const { id } = req.params;
  res.json(`update post with id ${id}`);
});

export default router;
