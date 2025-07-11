import express, { Application } from "express";
import dotenvFlow from "dotenv-flow";
import routes from "./routes";
import cors from "cors";
import { testConnection } from "./repository/database";
import { setupDocs } from "./util/documentation";

dotenvFlow.config();

// create express application
const app: Application = express();

export function startServer() {
  // cors first
  setupCors();

  // json body parser
  app.use(express.json());

  // bind routes to the app
  app.use("/aa-api", routes);

  // Docs
  setupDocs(app);

  //test connection by first connecting and then disconnecting to the db
  testConnection();

  // start the server and get port from .env or default to 4000
  const PORT: number = parseInt(process.env.PORT as string) || 4000;
  app.listen(PORT, function () {
    console.log("Server is running on port: " + PORT);
  });
}

/**
 * setup CORS policy
 */
function setupCors() {
  app.use(
    cors({
      origin: "*", // Allow requests from any origin
      // allow methods + headers + credentials
      methods: "GET,HEAD,PUT,OPTIONS,PATCH,POST,DELETE",
      allowedHeaders: [
        "auth-token",
        "Origin",
        "X-Requested-With",
        "Content-Type",
        "Accept",
      ], // Allow specific headers
      credentials: true,
    })
  );
}
