const express = require("express");
const groupController = require("../controllers/group.controller");

const groupRouter = express.Router();

groupRouter
  .route("/")
  .get(groupController.getAllGroups)
  .post(groupController.createNewGroup)
  .delete(groupController.deleteGroup)
  .patch(groupController.updateGroup);

module.exports = groupRouter;
