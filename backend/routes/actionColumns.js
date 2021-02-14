var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  // Comment out this line:
  //res.send('respond with a resource');

  // And insert something like this instead:
  res.json([
    {
      dataField: "username",
      text: "Participant",
    },
    {
      dataField: "actionItems",
      text: "Action Items",
    },
    {
      dataField: "startDate",
      text: "Start Date",
    },
    {
      dataField: "effortInDays",
      text: "Effort (in days)",
    },
    {
      dataField: "estCompletionDate",
      text: "Est. Completion Date",
    },
    { dataField: "progress", text: "% of Progress" },
    { dataField: "status", text: "Status" },
  ]);
});

module.exports = router;
