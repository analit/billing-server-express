const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('./services/logger');
const ErrorBilling = require('./services/response/ErrorBilling')
const ErrorApi = require('./services/response/ErrorApi')
const cache = require("./middleware/cache")

require('dotenv').config();
const dbConnection = require('./services/db');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const billingRouter = require('./routes/billing')
const apiRouter = require('./routes/api')

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.post('*', logger.request, cache.get);

app.use('/billing', billingRouter);
app.use('/api', apiRouter);

// catch application error
app.use(function (err, req, res, next) {
    if (err instanceof ErrorBilling) {
        res.body = {
            id: req.body.id,
            error: { code: err.code, message: err.message }
        }
        next()
    } else if (err instanceof ErrorApi) {
        res.body = {
            status: 'error',
            message: err.message
        }
        next();
    } else {
        next(err)
    }
});

app.post('*', logger.response, cache.set);

/** send response */
app.post('*', function (req, res, next) {
    (res.body && res.json(res.body)) || next()
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

app.closeDbConnection = async function (callback) {
    await dbConnection.close();
    callback();
}

module.exports = app;