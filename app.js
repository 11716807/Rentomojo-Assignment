var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var passport= require("passport");
var authenticate=require("./authenticate");
var config= require("./config");

var usersRouter = require('./routes/users');
var indexRouter = require('./routes/index');

var contactRouter = require('./routes/phonebook');
var mongoose=require('mongoose');

var cont= require('./model/contact');

const url = config.mongoUrl;


var connect= mongoose.connect(url);
connect.then((db)=>{
 console.log("connected...............");
},(err)=>{console.log("ERROR");})


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser('123-456-789'));


app.use(passport.initialize());
app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use(express.static(path.join(__dirname, 'public')));



app.use('/contacts',contactRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
