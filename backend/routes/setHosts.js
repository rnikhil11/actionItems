var express = require("express");
var router = express.Router();
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));
const usersController = require("../controllers/users.controllers");
// // Create a new form
// router.post("/", formController.create);

router.post("/", usersController.update);

module.exports = router;
