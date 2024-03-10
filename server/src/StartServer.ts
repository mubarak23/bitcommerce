import path from "path";
import "reflect-metadata";
import app from "./app";
import * as Cron from "./cron";
import * as GlobalErrorHandler from "./middleware/globalErrorHandler";
import runDatabaseMigrations from "./migrations";
import { RegisterRoutes } from "./routes";

require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

(async () => {
  await runDatabaseMigrations();

  await Cron.start();

  RegisterRoutes(app)
  GlobalErrorHandler.handleErrors(app)

  // - Start Http Server
  const portAsString: string = (process.env.PORT as string);
  const port = parseInt(portAsString) || 3400
  app.listen(port);
  
  console.log("Server started!");
})();
