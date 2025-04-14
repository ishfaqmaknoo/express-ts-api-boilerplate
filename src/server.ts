import app from "./app.js";
import config from "./config.js";
const PORT = config.port;

/**
 * Starts the server and listens on the specified port.
 * @returns {<void>}
 */
export function startServer(): void {
  const server = app.listen(PORT, () => {
    console.log(`Server is running on https://localhost:${PORT}`);
  });

  //Graceful shutdown
  const shutdown = (signal: string) => {
    console.log(`Received ${signal}. Shutting down gracefully...`);
    server.close(() => {
      console.log("Server closed.");
      process.exit(0);
    });

    // Optional: Force shutdown after a timeout
    setTimeout(() => {
      console.error("Forcing shutting down after timeout");
      process.exit(1);
    }, 10000); // 10 seconds
  };

  process.on("SIGINT", () => shutdown("SIGINT"));
  process.on("SIGTERM", () => shutdown("SIGTERM"));
}
