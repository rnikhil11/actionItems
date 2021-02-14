var express = require("express");
var router = express.Router();
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));
const meetingActionsController = require("../controllers/actions.controllers");
router.get("/", meetingActionsController.findByMeetingId);
module.exports = router;
