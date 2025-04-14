import { Router, Request, Response } from "express";

const router = Router();

router.use((req: Request, res: Response) => {
  res.status(404).json({
    requestedRoute: req.originalUrl,
    message: "Route not found",
  });
});

export default router;
