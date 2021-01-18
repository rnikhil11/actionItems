var express = require("express");
var router = express.Router();
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));
const formDataController = require("../controllers/formData.controllers");
router.get("/", formDataController.findAll);

module.exports = router;
