const mongoose = require("mongoose");

const Users = require("../models/users.model.js");
// Retrieve and return all forms from the database.

exports.findAll = (req, res) => {
  Users.find()
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
  const user = new Users({ username: req.body.username });
  user
    .save()
    .then((data) => {
      res.send({ mesg: "User succesfully created" });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Something went wrong while creating new user.",
      });
    });
};

exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    return res.status(400).send({
      message: "Please fill all required field",
    });
  }
  const items = req.body.users;
  const prs = [];
  let item;
  for (item of items) {
    const filter = { username: item.username };
    const { username, _id, host } = item;
    const update = { host };

    let doc = Users.findOneAndUpdate(filter, update, {
      new: true,
      upsert: true,
    });

    prs.push(doc);
  }
  Promise.all(prs)
    .then((data) => {
      res.status(200).send({ mesg: "Users succesfully created" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        mesg: err.message || "Something went wrong while creating new data.",
      });
    });
};
