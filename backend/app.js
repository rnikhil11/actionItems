var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

// Configuring the database
const dbConfig = require("./config/db.config.js");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

// Connecting to the database
mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log("Could not connect to the database.", err);
    process.exit();
  });

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var homeRouter = require("./routes/home");
var newFormRouter = require("./routes/newForm");
var chooseFormRouter = require("./routes/chooseForm");
var fillFormRouter = require("./routes/fillForm");
var completeFormRouter = require("./routes/completeForm");
var viewDataRouter = require("./routes/viewData");
var participantsRouter = require("./routes/participants");
var submitActionsRouter = require("./routes/submitActions");
var actionItemsRouter = require("./routes/actionItems");
var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/home", homeRouter);
app.use("/newForm", newFormRouter);
app.use("/chooseForm", chooseFormRouter);
app.use("/fillForm", fillFormRouter);
app.use("/completeForm", completeFormRouter);
app.use("/viewData", viewDataRouter);
app.use("/participants", participantsRouter);
app.use("/submitActions", submitActionsRouter);
app.use("/actionItems", actionItemsRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
