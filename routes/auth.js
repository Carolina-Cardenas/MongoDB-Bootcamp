import { Router } from "express";
import { authorizeKey } from "../middlewares/authorize.js";
import { registerUser } from "../services/schemaServices.js";
import { v4 as uuidv4 } from "uuid";
import { getUser } from "../services/userServices.js";

const router = Router();

//middleware
router.use(authorizeKey);

//get logaout
router.get("/logout", (req, res) => {
  res.json("logout");
});

//Post login
router.post("/login", async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return next({
      status: 400,
      message: "Username and password are required",
    });
  }

  try {
    const user = await getUser(username);

    if (!user) {
      return next({
        status: 400,
        message: "No user found",
      });
    }

    if (user.password !== password) {
      return next({
        status: 400,
        message: "Wrong username or password",
      });
    }

    // Simulando login
    global.user = user;

    res.status(200).json({
      success: true,
      message: "Login successful",
      user,
    });
  } catch (err) {
    next(err);
  }
});

//post register
router.post("/register", async (req, res, next) => {
  const { username, password } = req.body;
  if (username && password) {
    try {
      const result = await registerUser({
        username: username,
        password: password,
        userId: uuidv4().substring(0, 5),
      });

      if (result) {
        res.status(200).json({
          success: true,
          message: "User created successfully",
        });
      } else {
        next({
          status: 400,
          message: "Registration unsuccessful",
        });
      }
    } catch (error) {
      next({
        status: 500,
        message: "Internal server error during registration",
      });
    }
  } else {
    next({
      status: 400,
      message: "Username and password are required",
    });
  }
});

export default router;
