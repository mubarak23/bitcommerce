import "reflect-metadata";
import app from "./app";
import * as Cron from "./cron";
import runDatabaseMigrations from "./migrations";
import { RegisterRoutes } from "./routes";
import * as GlobalErrorHandler from "./middleware/globalErrorHandler";

(async () => {
  await runDatabaseMigrations();

  await Cron.start();

  RegisterRoutes(app)
  GlobalErrorHandler.handleErrors(app)

  // - Start Http Server
  const portAsString: string = (process.env.PORT as string);
  const port = parseInt(portAsString) || 3200
  app.listen(port);
  
  console.log("Server started!");
})();
