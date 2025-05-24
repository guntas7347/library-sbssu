const fs = require("fs");
const path = require("path");

const logFilePath = path.join(
  __dirname,
  "..",
  "..",
  "..",
  "..",
  "logs",
  "login.log"
);

const getLoginLogs = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(logFilePath, "utf-8", (err, data) => {
      if (err) reject(err);
      const lines = data.split("\n").filter(Boolean);

      const logs = lines
        .map((line) => {
          try {
            const a = JSON.parse(line);
            return {
              ...a.message,
              timestamp: new Date(a.timestamp).toLocaleString(),
            };
          } catch (error) {
            return null;
          }
        })
        .filter(Boolean);

      resolve(logs);
    });
  });
};

module.exports = { getLoginLogs };
