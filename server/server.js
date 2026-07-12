import dotenv from "dotenv";
import { app } from "./src/app.js";

dotenv.config({
  path: "./.env",
});

const port = process.env.PORT || 8000;

const server = app.listen(port, () => {
  console.log(`⚙️ Server is running at port : ${port}`);
});

async function gracefulShutdown(signal) {
  console.log(`\n🛑 Received ${signal}. Shutting down gracefully...`);
  server.close(() => {
    console.log("   HTTP server closed.");
    // In the future we could close the db pool here if necessary
    process.exit(0);
  });
}

process.on("SIGINT", () => gracefulShutdown("SIGINT"));
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
