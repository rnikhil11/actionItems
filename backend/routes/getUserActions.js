var express = require("express");
var router = express.Router();
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));
const userActionsController = require("../controllers/userActions.controllers");
router.get("/", userActionsController.findAll);
module.exports = router;
