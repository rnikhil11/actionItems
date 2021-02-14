var express = require("express");
var router = express.Router();
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));
const userActionsController = require("../controllers/userActions.controllers");
// // Create a new form
// router.post("/", formController.create);

router.post("/", userActionsController.updateMany);

module.exports = router;
