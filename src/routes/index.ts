import { Router } from "express";
import authRoutes from "./auth.js";
import healthRoutes from "./health.js";
import notFoundRoutes from "./not-found.js";

const router = Router();

// Auth related routes
router.use("/auth", authRoutes);

// Health check route
router.use("/health", healthRoutes);

// Catch all 404 route (no path)
router.use(notFoundRoutes);

export default router;
