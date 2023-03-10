var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const config = require ('./config/database');
var cors = require('cors');
const multer=require('multer');
const mongoose= require('mongoose')
const connection = mongoose.connect(config.database, {
  useNewUrlParser: true, useUnifiedTopology: true });
if(connection){
console.log("database connected");
}          
else{
console.log("database connection error");
}

var adminRouter = require('./routes/admin');
var usersRouter = require('./routes/users');
var ChatRoute = require('./routes/chatRoute');
var MessageRoute=require('./routes/messageRoute');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', usersRouter);
app.use('/admin', adminRouter);
app.use('/chat',ChatRoute);
app.use('/message',MessageRoute);

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

// var createError = require('http-errors');
// var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');

// //mongo db and mongoose from config
// const {connectdb}=require('../server/config/connection')
// connectdb()

// var adminRouter = require('./routes/admin');
// var usersRouter = require('./routes/users');
// var ChatRoute=require('./routes/ChatRoute')
// var MessageRoute=require('./routes/MessageRoute')
// var app = express();
// //cors setup
// var cors=require('cors')
// app.use(cors())

// const dotenv = require('dotenv')
// dotenv.config()

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// //image and video path for react page
// app.use('/images',express.static(path.join(__dirname,'public/images')))
// // app.set('view engine', 'jade');

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', adminRouter);
// app.use('/', usersRouter);
// app.use('/chat',ChatRoute);
// app.use('/message',MessageRoute);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// module.exports = app;
