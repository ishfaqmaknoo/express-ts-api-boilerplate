import express, { Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";

import { errorHandler } from "./middlewares/error-handler.js";
import routes from "./routes/index.js";

const app = express();

/**
 *  Third Party Middlewares
 *  Security Middlewares
 * - CORS allows you to specify which domains are allowed to access your resources.
 * - Helmet helps you secure your Express apps by setting various HTTP headers.
 */
app.use(helmet());
app.use(cors());

/**
 *  Builtin Middlewares
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/**
 * *  Compression Middleware
 * * - Compression middleware compresses the response body to reduce the size of the data sent over the network.
 * * - This can help improve the performance of your application, especially for large responses.
 */
app.use(compression({ filter: shouldCompress }));

function shouldCompress(req: Request, res: Response): boolean {
  if (req.headers["x-no-compression"]) {
    // don't compress responses with this request header
    return false;
  }

  // fallback to standard filter function
  return compression.filter(req, res);
}

/**
 *  Rate Limiting Middleware
 *  - This middleware limits the number of requests from a single IP address to prevent abuse.
 *  - You can adjust the windowMs and max values to suit your needs.
 */
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests, please try again later.",
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.use(limiter);

/**
 *
 * Routes
 */
app.use("/api", routes);

// 404 handler (for undefined routes)
app.use(routes);

/**
 *  Error Middleware
 */
app.use(errorHandler);

export default app;
