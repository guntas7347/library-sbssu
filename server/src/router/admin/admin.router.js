const express = require("express");
const { memberRoute } = require("./member/member.router.admin");
const { booksRouter } = require("./books/books.router.admin");
const { staffRouter } = require("./staff/staff.router.admin");
const crs = require("../../utils/custom-response-codes");
const { searchMembers } = require("../../models/member/member.controllers");
const { searchBooks } = require("../../models/books/books.controllers");
const {
  searchAccessions,
} = require("../../models/book-accessions/book-accessions.controllers");
const { authorisationLevel } = require("../auth/auth.middlewares");
const { transactionsRouter } = require("./transactions/transactions.router");
const { settingsRouter } = require("./settings/settings.router.admin");

const adminRouter = express.Router();

adminRouter.use("/members", memberRoute);
adminRouter.use("/books", booksRouter);
adminRouter.use("/staff", staffRouter);
adminRouter.use("/transactions", transactionsRouter);
adminRouter.use("/settings", authorisationLevel(6), settingsRouter);

adminRouter.post("/search", authorisationLevel(2), async (req, res) => {
  try {
    const members = await searchMembers(req.query);
    const books = await searchBooks(req.query);
    const accessions = await searchAccessions(req.query);
    return res.status(200).json(crs.SRH200GLB({ members, books, accessions }));
  } catch (err) {
    createLog(err);
    return res.status(500).json(crs.SERR500REST(err));
  }
});

adminRouter.post("/get-weather", async (req, res) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=30.914519&lon=74.652159&appid=${process.env.OPEN_WEATHER_API_KEY}`
    );

    const weather = await response.json();
    const otherResults = weather.weather[0];
    const result = {
      temp: (weather.main.temp - 273.15).toFixed(1),
      feels_like: (weather.main.feels_like - 273.15).toFixed(1),
      description: otherResults.description,
      icon: otherResults.icon,
      city: weather.name,
    };

    return res.status(200).json(crs.API200WEATHER(result));
  } catch (err) {
    createLog(err);
    return res.status(500).json(crs.SERR500REST(err));
  }
});

module.exports = { adminRouter };
