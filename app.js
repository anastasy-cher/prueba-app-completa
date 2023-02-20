const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { engine } = require('express-handlebars')
const flash = require('connect-flash')
const session = require('express-session')
const mysqlstore = require('express-mysql-session')
const {database} = require('./keys')
const passport = require('passport')

const indexRouter = require('./routes/index');
const linksRouter = require('./routes/links')
const authenRouter = require('./routes/authentication');
require('dotenv').config()
// Initialization
const app = express();
require('./lib/passport')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', engine({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs',
  helpers: require('./lib/handlebars')

}))
app.set('view engine', '.hbs');

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  store: new mysqlstore(database)
}))
app.use(flash())

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize())
app.use(passport.session())

// Global
app.use( (req,res,next) => {
  app.locals.success = req.flash('success')
  app.locals.message = req.flash('message')
  app.locals.user = req.user
  next()
})

// Routes
app.use('/', indexRouter);
app.use('/', authenRouter)
app.use('/links', linksRouter)

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
