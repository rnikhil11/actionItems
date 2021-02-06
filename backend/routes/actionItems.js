var express = require("express");
var router = express.Router();
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));
const actionsController = require("../controllers/actions.controllers");
router.get("/", actionsController.findAll);
module.exports = router;
