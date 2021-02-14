const mongoose = require("mongoose");

const Actions = require("../models/actions.model.js");
// Retrieve and return all forms from the database.

exports.findByMeetingId = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Please fill all required fields",
    });
  }

  Actions.find({ meetingId: req.query.meetingId })
    .then((items) => {
      console.log(items);
      res.json(items);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Something went wrong while getting list of items.",
      });
    });
};
exports.updateMany = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Please fill all required fields",
    });
  }
  const items = req.body.actions;
  const prs = [];
  let item;
  for (item of items) {
    let doc;
    if (!item.isNew) {
      const filter = { username: item.username, meetingId: item.meetingId };
      const { username, _id, ...remaining } = item;
      const update = remaining;

      doc = await Actions.findOneAndUpdate(filter, update, {
        new: true,
        upsert: true,
      });
    } else {
      const { isNew, ...remaining } = item;
      doc = await Actions.create(remaining);
    }
    prs.push(doc);
  }
  Promise.all(prs)
    .then((data) => {
      res.status(200).send({ mesg: "Actions succesfully created" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        mesg: err.message || "Something went wrong while creating new data.",
      });
    });
};
