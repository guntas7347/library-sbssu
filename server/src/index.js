const http = require("http");
const { app } = require("./app");
const { mongoConnect } = require("./services/mongo");

const server = http.createServer(app);

const PORT = 8080;

const createServer = async () => {
  await mongoConnect();

  server.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}...`);
  });
};

createServer();
