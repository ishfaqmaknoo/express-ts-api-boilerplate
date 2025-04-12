process.on("unhandledRejection", (reason) => {
  console.error("UNHANDLED REJECTION!", reason);
  process.exit(1);
});

process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION!", err);
  process.exit(1);
});
