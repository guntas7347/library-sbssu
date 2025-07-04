import express from "express";
import { UPLOADS_PATH } from "./config/configs.js";
import globalMiddlewares from "./middlewares/index.js";
import router from "./routes/router.js";

const app = express();

globalMiddlewares(app);

app.use("/uploads", express.static(UPLOADS_PATH));

app.use("/api", router);

export default app;
