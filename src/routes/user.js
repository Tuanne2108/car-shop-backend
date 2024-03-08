const express = require("express");
const UserController = require("../controllers/UserController");
const {
    authenMiddleware,
    authenUserMiddleware,
} = require("../middleware/AuthenMiddleware");
const router = express.Router();

router.post("/log-in", UserController.logInUser);
router.post("/log-up", UserController.createUser);
router.post("/logout", UserController.logOutUser);
router.put("/update-user/:id", authenUserMiddleware, UserController.updateUser);
router.delete("/delete-user/:id", authenMiddleware, UserController.deleteUser);
router.get("/get-all-user", UserController.getAllUser);
router.get(
    "/get-user-details/:id",
    authenUserMiddleware,
    UserController.getUserDetails
);
router.post("/refresh-token", UserController.refreshToken);
module.exports = router;
