const mongoose = require('mongoose');

mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('error', (error) => { console.log(error); process.exit() })