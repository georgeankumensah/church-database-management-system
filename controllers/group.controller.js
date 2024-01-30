const Group = require("../models/departments/group.model");
const Member = require("../models/member.model");

// dependencies
const asyncHandler = require("express-async-handler");

// @desc get all groups
// @route GET /groups
// @access public
const getAllGroups = asyncHandler(async (req, res) => {
  const groups = await Group.find().populate('members leader').lean();
  if (!groups?.length) {
    return res.status(404).json({
      message: "No groups found",
    });
  }

  return res.json(groups);
});

// @desc create a new group
// @route POST /groups
// @access private
const createNewGroup = asyncHandler(async (req, res) => {
  const { name, description, members, meeting_schedule, leader } = req.body;

  // confirm the data received
  if (!name || !description || !meeting_schedule) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  // create and store a group
  const groupObject = {
    name,
    description,
    members,
    meeting_schedule,
    leader ,
  };

  const group = await Group.create(groupObject);

  if (group) {
    // group was created
    res.status(201).json({
      message: `New group created: ${name}`,
    });
  } else {
    res.status(400).json({
      message: "Invalid group data received",
    });
  }
});

// @desc update a group
// @route PATCH /groups
// @access private
const updateGroup = asyncHandler(async (req, res) => {
  const { id, name, description, members, meeting_schedule, leader } = req.body;

  // confirm received data
  if (!id || !name || !description || !meeting_schedule || !leader || !members || !members.length) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  const group = await Group.findById(id).exec();

  if (!group) {
    return res.status(400).json({
      message: "Group not found",
    });
  }

  group.name = name;
  group.description = description;
  group.members = members;
  group.meeting_schedule = meeting_schedule;
  group.leader = leader;

  const updatedGroup = await group.save();

  res.status(201).json({
    message: `Group updated: ${updatedGroup.name}`,
  });
});

// @desc delete a group
// @route DELETE /groups
// @access private
const deleteGroup = asyncHandler(async (req, res) => {
  const { id } = req.body;

  // check if id is received
  if (!id) {
    return res.status(400).json({
      message: "Group ID required",
    });
  }

  // check if the group exists
  const group = await Group.findById(id).exec();

  if (!group) {
    return res.status(400).json({
      message: "Group not found",
    });
  }

  const result = await group.deleteOne();

  const reply = `Group ${group.name} with ID ${group._id} deleted`;

  res.json(reply);
});

module.exports = {
  getAllGroups,
  createNewGroup,
  updateGroup,
  deleteGroup,
};
