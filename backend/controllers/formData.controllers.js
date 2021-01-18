const mongoose = require("mongoose");

const FormData = require("../models/formData.model.js");
// Retrieve and return all forms from the database.
exports.findAll = (req, res) => {
  console.log("FInding forms with formID: " + req.query.formId);
  FormData.find({ formId: req.query.formId })
    .then((forms) => {
      res.send(forms);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Something went wrong while getting formdata.",
      });
    });
};
// Create and Save a new FormData
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    return res.status(400).send({
      message: "Please fill all required field",
    });
  }
  // Create a new form
  const formData = new FormData({
    data: req.body.data,
    formId: req.body.id,
  });
  // Save form in the database
  console.log(req.body);
  formData
    .save()
    .then((data) => {
      res.send("ormData succesfully submitted");
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Something went wrong while submitting form data.",
      });
    });
};
exports.findById = (req, res) => {
  FormData.findById(req.query.id)
    .then((form) => {
      if (!form) {
        return res.status(404).send({
          message: "FormData not found with id " + req.query.id,
        });
      }
      res.send(form);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "FormData not found with id " + req.query.id,
        });
      }
      return res.status(500).send({
        message: "Error getting form with id " + req.query.id,
      });
    });
};
// Update a User identified by the id in the request
// exports.update = async (req, res) => {
//   // Validate Request
//   if (!req.body) {
//     return res.status(400).send({
//       message: "Please fill all required field",
//     });
//   }
//   // Find user and update it with the request body
//   const item = await FormData.find({ formId: req.body.id });
//   FormData.updateOne(
//     { formId: req.body.id },
//     {
//       data: [...item.data, req.body.data],
//     }
//   )
//     .then((data) => {
//       if (!data) {
//         return res.status(404).send({
//           message: "From data not found with id " + req.body.id,
//         });
//       }
//       res.send(data);
//     })
//     .catch((err) => {
//       if (err.kind === "ObjectId") {
//         return res.status(404).send({
//           message: "form data not found with id " + req.body.id,
//         });
//       }
//       return res.status(500).send({
//         message: "Error updating form data with id " + req.body.id,
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
