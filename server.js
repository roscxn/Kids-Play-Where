const express = require("express");
const path = require("path");
const logger = require("morgan");
require('dotenv').config();
require('./config/database');

const app = express();
const usersRouter = require("./routes/usersRouter");
const locationRouter = require("./routes/locationRouter");
const reviewsRouter = require("./routes/reviewsRouter");

app.use(logger('dev'));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'dist')));
app.use(require('./config/checkToken'));
app.use("/api/user", usersRouter);
app.use("/api/location", locationRouter);
app.use("/api/reviews", reviewsRouter);

const port = process.env.PORT || 3000;

app.get("/api", (req, res) => {
  res.send("Hi!");
});

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, function() {
  console.log(`Express app running on port ${port}`)
});