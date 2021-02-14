const mongoose = require("mongoose");

const UserActions = require("../models/userActions.model.js");
// Retrieve and return all forms from the database.

exports.findAll = (req, res) => {
  UserActions.find()
    .then((items) => {
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
    const filter = { username: item.username };
    const { username, _id, ...remaining } = item;
    const update = remaining;

    let doc = await UserActions.findOneAndUpdate(filter, update, {
      new: true,
      upsert: true,
    });
    prs.push(doc);
  }
  Promise.all(prs)
    .then((data) => {
      res.status(200).send({ mesg: "User Actions susccesfully created" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        mesg: err.message || "Something went wrong while creating new data.",
      });
    });
};
