/// <reference path="./types/global.d.ts" />

import "dotenv/config";
import buildServer from "./app";

const PORT = +(process.env.PORT ?? 8080);

const startServer = async () => {
  const app = await buildServer();
  try {
    await app.listen({ port: PORT, host: "0.0.0.0" });
    console.log(`Server running at port ${PORT}`);
  } catch (error: any) {
    try {
      console.log(`Error in starting server: ${error.code}`);
      await app.close();
    } catch (error) {
      process.exit(1);
    }
  }
};

startServer();
