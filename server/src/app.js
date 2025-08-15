import express from "express";
import {
  REACT_BUILD_PATH,
  REACT_INDEX_PATH,
  UPLOADS_PATH,
} from "./config/configs.js";
import globalMiddlewares from "./middlewares/index.js";
import router from "./routes/router.js";
import "./controllers/cron/cron.js";

const app = express();

globalMiddlewares(app);

app.use("/api", router);

app.use("/uploads", express.static(UPLOADS_PATH));

app.use(express.static(REACT_BUILD_PATH));
app.get(/.*/, (req, res) => {
  res.sendFile(REACT_INDEX_PATH);
});

export default app;
