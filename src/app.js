const citiesController = require("./cities/cities.controller");
const errorMiddleware = require("./middlewares/error-handler.middleware");
const express = require("express");

const app = express();
const port = 3131;

app.use("/cities", citiesController);

app.listen(port, () => {
  console.log("Server is running! 🚀");
});

app.use(errorMiddleware);
