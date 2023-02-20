const express = require("express");
const app = express();
const cors = require("cors");

const routesIndex = require("./routes/routes.index.js");

app.use(express.json());
app.use(cors());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(routesIndex);

module.exports = { app };
