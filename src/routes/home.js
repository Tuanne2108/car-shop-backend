const express = require("express");
const HomeController = require("../controllers/HomeController");
const router = express.Router();

router.use('/', HomeController.index)

module.exports = router;