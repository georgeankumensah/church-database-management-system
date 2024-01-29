const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const path = require("path");

const morgan = require("morgan");

const app = express();

dotenv.config();
app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "/public")));

// Routers
const userRouter = require("../routes/user.route");
const memberRouter = require("../routes/member.route");
const eventRouter = require("../routes/event.route");

// Routes
app.use("/users", userRouter);
app.use("/members", memberRouter);

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    // handle wrong page routes
    res.sendFile(path.join(__dirname, "..", "views", "404.html"));
  } else if (req.accepts("json")) {
    // handle wrong api routes
    res.json({ message: "404 Not found" });
  } else {
    // default response type
    res.type("txt").send("404 Not found");
  }
});

module.exports = app;
