const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const ErrorBilling = require('./services/response/ErrorBilling')
const ErrorApi = require('./services/response/ErrorApi')

require('dotenv').config();
require('./services/db');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const billingRouter = require('./routes/billing')
const apiRouter = require('./routes/api')

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/billing', billingRouter);
app.use('/api', apiRouter);

// catch application error
app.use(function(err, req, res, next) {
    if (err instanceof ErrorBilling) {
        res.json({
            id: req.body.id,
            error: { code: err.code, message: err.message }
        })
    } else if (err instanceof ErrorApi) {
        res.json({
            status: 'error',
            error: err.message
        })
    } else {
        next(err)
    }

});

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