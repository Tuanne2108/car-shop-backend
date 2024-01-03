const express = require("express");
const UserController = require("../controllers/UserController");
const router = express.Router();

router.use('/', UserController.createUser)

module.exports = router;