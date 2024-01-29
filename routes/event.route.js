const express = require("express");
const eventController = require("../controllers/event.controller");

const eventRouter = express.Router();

eventRouter
  .route("/")
  .get(eventController.getAllEvents)
  .post(eventController.createNewEvent)
  .delete(eventController.deleteEvent)
  .patch(eventController.updateEvent);

module.exports = eventRouter;
