var express = require("express");
var router = express.Router();
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));
const formController = require("../controllers/form.controllers");
const formDataController = require("../controllers/formData.controllers");
// // Create a new form
// router.post("/", formController.create);
router.post("/", formController.create);
// router.post("/", formDataController.create);
// const express = require("express");
// const router = express.Router();

// // Retrieve a single user with id
// router.get("/:id", userController.findOne);
// // Update a user with id
// router.put("/:id", userController.update);
// // Delete a user with id
// router.delete("/:id", userController.delete);

module.exports = router;
