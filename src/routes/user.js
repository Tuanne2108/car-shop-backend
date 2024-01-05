const express = require("express");
const UserController = require("../controllers/UserController");
const router = express.Router();

router.post('/log-in', UserController.logInUser)
router.post('/log-up', UserController.createUser)
router.put('/update-user/:id', UserController.updateUser)

module.exports = router;