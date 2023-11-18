var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
var Account =require('./models/account');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(
  function (username, password, done) {
    Account.findOne({ username: username })
      .then(function (user) {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      })
      .catch(function (err) {
        return done(err)
      })
  })
)

passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());


require('dotenv').config();
const connectionString = process.env.MONGO_CON
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Error Connecting to MongoDB: ", err));
//Get the default connection
var db = mongoose.connection;

//Bind connection to error event

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once("open", function () { console.log("Connection to DB succeeded") })


var flower = require("./models/flower");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var flowerRouter = require('./routes/flower');
var boardRouter = require('./routes/board');
var chooseRouter = require("./routes/choose");
var resourceRouter = require('./routes/resource');
var flowersRouter = require('./routes/flowers');

async function recreateDB() {
  // Delete everything
  await flower.deleteMany()
  let instance1 = new flower(
    {
      flowerName: "Rose",
      flowerCost: 10,
      Description: "Roses are red"
    });
  let instance2 = new flower(
    {
      flowerName: "Sunflower",
      flowerCost: 4,
      Description: "it follows the sun and have bright and radiating petals"
    });

  let instance3 = new flower(
    {
      flowerName: "Tulip",
      flowerCost: 5,
      Description: "symbolize for spring"
    });
  instance1.save()
    .then(doc => { console.log("First object saved") })
    .catch(err => { console.error(err) })
  instance2.save()
    .then(doc => { console.log("Second object saved") })
    .catch(err => { console.error(err) })
  instance3.save()
    .then(doc => { console.log("Third object saved") })
    .catch(err => { console.error(err) })
}
let reseed = true;
if (reseed) { recreateDB(); }
var app = express();
// view engine setup
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use('/flower', flowerRouter);
app.use('/board', boardRouter);
app.use("/choose", chooseRouter);

app.use("/resource", resourceRouter);
app.use('/flowers', flowersRouter);

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



