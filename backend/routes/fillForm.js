var express = require("express");
var router = express.Router();
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));
const formController = require("../controllers/form.controllers");
router.get("/", formController.findById);

module.exports = router;
