import { Router, Request, Response, NextFunction } from "express";
import AppError from "../utils/app-error.js";

const router = Router();

router.post(
  "/register",
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const { name, email, password } = req.body;

      if (!req.body) {
        return res.status(400).json({ message: "req.body cannot be empty" });
      }

      if (!name || !email || !password) {
        return res
          .status(400)
          .json({ message: "Name, email, password are required." });
      }

      // Register logic here

      res.status(200).json({ message: "User registered successfully!" });
    } catch (error: any) {
      console.log("Something went wrong", error.message);

      next(new AppError("Invalid request", 400)); // send to error Handler
    }
  }
);

export default router;
