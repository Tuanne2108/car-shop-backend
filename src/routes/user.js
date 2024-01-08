const express = require("express");
const UserController = require("../controllers/UserController");
const { authenMiddleware } = require("../middleware/AuthenMiddleware");
const router = express.Router();

router.post("/log-in", UserController.logInUser);
router.post("/log-up", UserController.createUser);
router.put("/update-user/:id", UserController.updateUser);
router.delete("/delete-user/:id", authenMiddleware, UserController.deleteUser);
router.get("/get-all-user", authenMiddleware, UserController.getAllUser);
router.get("/get-user-details/:id", UserController.getUserDetails);

module.exports = router;
