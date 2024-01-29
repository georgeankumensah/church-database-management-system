const Member = require("../models/member.model");

// dependencies
const asyncHandler = require("express-async-handler");

// @desc get all members
// @route GET /members
// @access private
const getAllMembers = asyncHandler(async (req, res) => {
  const members = await Member.find().lean();
  if (!members?.length) {
    return res.status(404).json({
      message: "No members found",
    });
  }

  return res.json(members);
});

// @desc create a new member
// @route POST /members
// @access private
const createNewMember = asyncHandler(async (req, res) => {
  const {
    first_name,
    last_name,
    gender,
    date_of_birth,
    contact_info,
    address,
    joining_date,
    baptism_date,
    marital_status,
    spouse,
    children,
    active,
    groups,
    events_attended,
    roles,
  } = req.body;

  // confirm the data received
  if (!first_name || !last_name || !gender || !date_of_birth) {
    return res.status(400).json({
      message: "All required fields must be provided",
    });
  }

  // create and store a member
  const memberObject = {
    first_name,
    last_name,
    gender,
    date_of_birth,
    contact_info,
    address,
    joining_date,
    baptism_date,
    marital_status,
    spouse,
    children,
    active,
    groups,
    events_attended,
    roles,
  };

  const member = await Member.create(memberObject);

  if (member) {
    // member was created
    res.status(201).json({
      message: `New member created: ${first_name} ${last_name}`,
    });
  } else {
    res.status(400).json({
      message: "Invalid member data received",
    });
  }
});

// @desc update a member
// @route PATCH /members
// @access private
const updateMember = asyncHandler(async (req, res) => {
  const { id, first_name, last_name, gender, date_of_birth } = req.body;

  // confirm received data
  if (!id || !first_name || !last_name || !gender || !date_of_birth) {
    return res.status(400).json({
      message: "All required fields must be provided",
    });
  }

  const member = await Member.findById(id).exec();

  if (!member) {
    return res.status(400).json({
      message: "Member not found",
    });
  }

  member.first_name = first_name;
  member.last_name = last_name;
  member.gender = gender;
  member.date_of_birth = date_of_birth;

  const updatedMember = await member.save();

  res.status(201).json({
    message: `Member updated: ${updatedMember.first_name} ${updatedMember.last_name}`,
  });
});

// @desc delete a member
// @route DELETE /members
// @access private
const deleteMember = asyncHandler(async (req, res) => {
  const { id } = req.body;

  // check if id is received
  if (!id) {
    return res.status(400).json({
      message: "Member ID required",
    });
  }

  // check if the member exists
  const member = await Member.findById(id).exec();

  if (!member) {
    return res.status(400).json({
      message: "Member not found",
    });
  }

  const result = await member.deleteOne();

  const reply = `Member ${member.first_name} ${member.last_name} with ID ${member._id} deleted`;

  res.json(reply);
});

module.exports = {
  getAllMembers,
  createNewMember,
  updateMember,
  deleteMember,
};
