var express = require("express");
var router = express.Router();
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));
const usersController = require("../controllers/users.controllers");
router.get("/", usersController.findAll);
module.exports = router;
