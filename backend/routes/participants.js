var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  // Comment out this line:
  //res.send('respond with a resource');

  // And insert something like this instead:
  const depts = [
    "Infrastructure",
    "Solution Engineering",
    "Product Management",
    "Sales",
    "Customer Engagement",
    "Business Development",
    "HR",
    "Marketing",
    "Management",
    "Client Relations",
  ];
  const roles = [
    "Software Engineer",
    "Business Analyst",
    "Project Manager",
    "IT Manager",
    "VP of Sales",
    "Business Development",
    "Sales Consultant",
    "CEO",
    "Marketing",
    "Strategic Analyst",
    "Test Engineer",
    "QA Engineer",
    "Dev Ops Engineer",
    "DBA",
    "Sys Admin",
    "Architect",
    "Cloud Engineer",
  ];
  res.json([
    {
      id: 1,
      username: depts[0] + "." + roles[0] + "." + "user1",

      host: true,
    },
    {
      id: 2,
      username: depts[1] + "." + roles[1] + "." + "user2",
    },
    {
      id: 3,
      username: depts[3] + "." + roles[2] + "." + "user3",
    },
    {
      id: 4,
      username: depts[1] + "." + roles[0] + "." + "user4",
    },
    {
      id: 5,
      username: depts[2] + "." + roles[1] + "." + "user5",
    },
    {
      id: 6,
      username: depts[3] + "." + roles[2] + "." + "user6",
    },
  ]);
});

module.exports = router;
