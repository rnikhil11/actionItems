var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  // Comment out this line:
  //res.send('respond with a resource');

  // And insert something like this instead:
  res.json([
    {
      id: 1,
      username: "user1",
      host: true,
    },
    {
      id: 2,
      username: "user2",
    },
    {
      id: 3,
      username: "user3",
    },
  ]);
});

module.exports = router;
