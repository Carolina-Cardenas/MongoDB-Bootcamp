import { Router } from "express";
import { authorizeKey, authorizeUser } from "../middlewares/authorize.js";
import {
  getAllTodos,
  getTodosByUserId,
  createTodo,
  toggleTodoStatus,
  deleteTodo,
} from "../services/todoServices.js";

const router = Router();

// Aplica authorizeKey a todas las rutas
router.use(authorizeKey);

// GET /api/todos → Obtener todos los todos
router.get("/", async (req, res, next) => {
  try {
    const todos = await getAllTodos();
    res.status(200).json({ success: true, todos });
  } catch (error) {
    next(error);
  }
});

// GET /api/todos/:userId → Obtener todos los todos de un usuario
router.get("/:userId", async (req, res, next) => {
  const { userId } = req.params;
  try {
    const todos = await getTodosByUserId(userId);
    res.status(200).json({ success: true, todos });
  } catch (error) {
    next(error);
  }
});

// POST new todo → Crear un nuevo todo (requiere usuario)
router.post("/", authorizeUser, async (req, res, next) => {
  try {
    const newTodo = await createTodo(req.body.task, global.user.userId);
    res.status(201).json({ success: true, todo: newTodo });
  } catch (error) {
    next(error);
  }
});

// PUT /api/todos
router.put("/:todoId", authorizeUser, async (req, res, next) => {
  try {
    const updatedTodo = await toggleTodoStatus(
      req.params.todoId,
      global.user.userId
    );
    res.status(200).json({ success: true, todo: updatedTodo });
  } catch (error) {
    next(error);
  }
});

// DELETE /api/todos/:todoId → Eliminar todo (requiere usuario)
router.delete("/:todoId", authorizeUser, async (req, res, next) => {
  try {
    const result = await deleteTodo(req.params.todoId, global.user.userId);
    res.status(200).json({ success: true, deleted: result });
  } catch (error) {
    next(error);
  }
});

export default router;
