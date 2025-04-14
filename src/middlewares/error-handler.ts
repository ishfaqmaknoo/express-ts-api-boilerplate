import { Request, Response, NextFunction } from "express";
import AppError from "../utils/app-error.js";
import config from "../config.js";
import { DEFAULT_NODE_ENV } from "../constants/common.js";

export function errorHandler(
  err: AppError | Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  const isDev = config.nodeEnv === DEFAULT_NODE_ENV;

  const statusCode = (err instanceof AppError && err.statusCode) || 500;
  const message =
    err instanceof AppError ? err.message : "Internal Server Error";

  //Log only unexpected errors or all in dev
  if (!err || !(err instanceof AppError) || isDev) {
    console.error("🔥 Error:", {
      message: err.message,
      stack: err.stack,
    });
  }

  res.status(statusCode).json({
    success: false,
    message,
    // optional: stack trace ( goog for dev, mot for prod)
    ...(isDev && { stack: err.stack }),
  });
}
