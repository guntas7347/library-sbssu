require("dotenv").config();

const http = require("http");
const { app } = require("./app");
const { mongoConnect } = require("./services/mongo");

const server = http.createServer(app);

const PORT = process.env.PORT || 8080;

const createServer = async () => {
  try {
    await mongoConnect();
    server.listen(PORT, () => {
      console.log(`Listening on Port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

createServer();
