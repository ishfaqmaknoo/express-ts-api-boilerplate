import express from "express";
import { errorHandler } from "./middlewares/error-handler.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();

/**
 *  Middlewares
 */

app.use(express.json());

/**
 *
 * Routes
 */

app.use("/api/auth", authRoutes);

/**
 *  Error Middlewares
 */

app.use(errorHandler);

export default app;
