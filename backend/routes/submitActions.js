var express = require("express");
var router = express.Router();
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));
const actionsController = require("../controllers/actions.controllers");
// // Create a new form
// router.post("/", formController.create);

router.post("/", actionsController.updateMany);

module.exports = router;
