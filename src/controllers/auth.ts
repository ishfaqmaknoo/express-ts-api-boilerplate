import { Request, Response, NextFunction } from "express";
import AppError from "../utils/app-error.js";
import { createUser } from "../services/auth.js";

export async function registerUser(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  try {
    if (!req.body) {
      return res.status(400).json({ message: "req.body cannot be empty" });
    }

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    await createUser({ name, email, password });

    res.status(200).json({ message: "User registered successfully!" });
  } catch (error: any) {
    console.log("Something went wrong", error.message);

    next(new AppError("Invalid request", 400)); // send to error Handler
  }
}
