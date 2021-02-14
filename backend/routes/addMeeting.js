var express = require("express");
var router = express.Router();
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));
const meetingsController = require("../controllers/meetings.controllers");
// // Create a new form
// router.post("/", formController.create);

router.post("/", meetingsController.create);

module.exports = router;
