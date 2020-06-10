const express = require("express");

const router = express.Router();
router.get("/status", require("./status"));
router.get("/users", require("./users"));

module.exports = router;
