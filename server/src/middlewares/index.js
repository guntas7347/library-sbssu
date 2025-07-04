import cors from "cors";
import cookieParser from "cookie-parser";

const globalMiddlewares = (app) => {
  app.use(cors());
  app.use(cookieParser());

  app.use((req) => {
    console.log("Called at: " + req.url);
  });
};

export default globalMiddlewares;
