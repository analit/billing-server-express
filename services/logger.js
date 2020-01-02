const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

const logDir = path.join(__dirname, "../logs");
fs.existsSync(logDir) || fs.mkdirSync("logs");
const logStream = fs.createWriteStream(path.join(logDir, "log.log"), { flags: 'a' });


morgan.token('request', function (req, res) {
    return JSON.stringify(req.body || 'undefined');
});

morgan.token('response', function (req, res) {
    return JSON.stringify(res.body || 'undefined');
});

module.exports = {
    request: morgan(':date[iso] --> :url :request', {stream: logStream}),
    response: morgan(':date[iso] <-- :url :response', {stream: logStream})
};