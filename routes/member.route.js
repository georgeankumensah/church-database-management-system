const express = require("express");
const memberController = require("../controllers/member.controller");

const memberRouter = express.Router();

memberRouter
  .route("/")
  .get(memberController.getAllMembers)
  .post(memberController.createNewMember)
  .delete(memberController.deleteMember)
  .patch(memberController.updateMember);

module.exports = memberRouter;
