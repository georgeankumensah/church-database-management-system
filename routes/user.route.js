const express = require("express")

const userController =  require("../controllers/user.controller")

const userRouter = express.Router();

userRouter
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createNewUser)
  .delete(userController.deleteUser)
  .patch(userController.updateUser);

module.exports = userRouter;