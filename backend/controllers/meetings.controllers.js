const mongoose = require("mongoose");

const Meetings = require("../models/meetings.model.js");
// Retrieve and return all forms from the database.

exports.findAll = (req, res) => {
  Meetings.find()
    .then((items) => {
      res.json(items);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Something went wrong while getting list of meetings.",
      });
    });
};
exports.create = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Please fill all required fields",
    });
  }
  const meeting = new Meetings({ meetingId: req.body.meetingId });
  meeting
    .save()
    .then((data) => {
      res.send({ mesg: "Meeting succesfully created" });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Something went wrong while creating new meeting.",
      });
    });
};
