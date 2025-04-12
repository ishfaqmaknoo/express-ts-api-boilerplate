import app from "./app.js";
const PORT = process.env.PORT || 3000;

function initServer() {
  try {
    app.listen(PORT, () =>
      console.log(`Server is running on  https://localhost:${PORT}`)
    );
  } catch (error: any) {
    console.error("Failed to start server: ", error);
    process.exit(1);
  }
}

export default initServer;
