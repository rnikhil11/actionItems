var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  // Comment out this line:
  //res.send('respond with a resource');

  // And insert something like this instead:
  res.sendFile(__dirname + "/home.html");
});

module.exports = router;
