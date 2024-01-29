const Event = require("../models/departments/events.model");
const Member = require("../models/member.model");

// dependencies
const asyncHandler = require("express-async-handler");

// @desc get all events
// @route GET /events
// @access public
const getAllEvents = asyncHandler(async (req, res) => {
  const events = await Event.find().lean();
  if (!events?.length) {
    return res.status(404).json({
      message: "No events found",
    });
  }

  return res.json(events);
});

// @desc create a new event
// @route POST /events
// @access private
const createNewEvent = asyncHandler(async (req, res) => {
  const { name, date, location, description } = req.body;

  // confirm the data received
  if (!name || !date || !location || !description) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  // create and store an event
  const eventObject = {
    name,
    date,
    location,
    description,
  };

  const event = await Event.create(eventObject);

  if (event) {
    // event was created
    res.status(201).json({
      message: `New event created: ${name}`,
    });
  } else {
    res.status(400).json({
      message: "Invalid event data received",
    });
  }
});

// @desc update an event
// @route PATCH /events
// @access private
const updateEvent = asyncHandler(async (req, res) => {
  const { id, name, date, location, description } = req.body;

  // confirm received data
  if (!id || !name || !date || !location || !description) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  const event = await Event.findById(id).exec();

  if (!event) {
    return res.status(400).json({
      message: "Event not found",
    });
  }

  event.name = name;
  event.date = date;
  event.location = location;
  event.description = description;

  const updatedEvent = await event.save();

  res.status(201).json({
    message: `Event updated: ${updatedEvent.name}`,
  });
});

// @desc delete an event
// @route DELETE /events
// @access private
const deleteEvent = asyncHandler(async (req, res) => {
  const { id } = req.body;

  // check if id is received
  if (!id) {
    return res.status(400).json({
      message: "Event ID required",
    });
  }

  // check if the event exists
  const event = await Event.findById(id).exec();

  if (!event) {
    return res.status(400).json({
      message: "Event not found",
    });
  }

  const result = await event.deleteOne();

  const reply = `Event ${event.name} with ID ${event._id} deleted`;

  res.json(reply);
});

module.exports = {
  getAllEvents,
  createNewEvent,
  updateEvent,
  deleteEvent,
};
