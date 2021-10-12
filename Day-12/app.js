var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const {
  redisClient,
  RedisStore,
  session
}=  require("./database/redis");
require('./database/mongo');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const router = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session (
  {
    store:new RedisStore({ client:redisClient}),
    secret:'secret$%123',
    saveUninitialized:false,
    cookie : {
      secure:false,
      httpOnly:false,
      maxAge:1000 * 60 *10
    }
  }
))
app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
