const express = require("express");
const logger = require("express-bunyan-logger");

const app = express();

if (process.env.NODE_ENV !== "test") app.use(logger());
app.use(require("./routes"));
app.use((_, res) => res.redirect(302, "/api/status"));
app.use(require("./middlewares/error-handler"));

module.exports = app;
