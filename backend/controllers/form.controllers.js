const mongoose = require("mongoose");

const Form = require("../models/form.model.js");
// Retrieve and return all forms from the database.
exports.findAll = (req, res) => {
  Form.find()
    .then((forms) => {
      res.send(forms);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Something went wrong while getting list of forms.",
      });
    });
};
// Create and Save a new Form
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    return res.status(400).send({
      message: "Please fill all required field",
    });
  }
  // Create a new form
  const form = new Form({
    title: req.body.title,
    description: req.body.description,
    content: req.body.content,
  });
  // Save form in the database
  form
    .save()
    .then((data) => {
      res.send({ formId: form._id, mesg: "Form succesfully created" });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Something went wrong while creating new form.",
      });
    });
};
exports.findById = (req, res) => {
  Form.findById(req.query.id)
    .then((form) => {
      if (!form) {
        return res.status(404).send({
          message: "Form not found with id " + req.query.id,
        });
      }
      res.send(form);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Form not found with id " + req.query.id,
        });
      }
      return res.status(500).send({
        message: "Error getting form with id " + req.query.id,
      });
    });
};
// // Update a User identified by the id in the request
// exports.update = (req, res) => {
//   // Validate Request
//   if (!req.body) {
//     return res.status(400).send({
//       message: "Please fill all required field",
//     });
//   }
//   // Find user and update it with the request body
//   User.findByIdAndUpdate(
//     req.params.id,
//     {
//       first_name: req.body.first_name,
//       last_name: req.body.last_name,
//       email: req.body.last_name,
//       phone: req.body.last_name,
//     },
//     { new: true }
//   )
//     .then((user) => {
//       if (!user) {
//         return res.status(404).send({
//           message: "user not found with id " + req.params.id,
//         });
//       }
//       res.send(user);
//     })
//     .catch((err) => {
//       if (err.kind === "ObjectId") {
//         return res.status(404).send({
//           message: "user not found with id " + req.params.id,
//         });
//       }
//       return res.status(500).send({
//         message: "Error updating user with id " + req.params.id,
//       });
//     });
// };
// // Delete a User with the specified id in the request
// exports.delete = (req, res) => {
//   User.findByIdAndRemove(req.params.id)
//     .then((user) => {
//       if (!user) {
//         return res.status(404).send({
//           message: "user not found with id " + req.params.id,
//         });
//       }
//       res.send({ message: "user deleted successfully!" });
//     })
//     .catch((err) => {
//       if (err.kind === "ObjectId" || err.name === "NotFound") {
//         return res.status(404).send({
//           message: "user not found with id " + req.params.id,
//         });
//       }
//       return res.status(500).send({
//         message: "Could not delete user with id " + req.params.id,
//       });
//     });
// };
