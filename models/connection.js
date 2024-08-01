const mongoose = require('mongoose');

const connectionString = process.env.CONNECTION_STRING;

mongoose.set('strictQuery', true);

mongoose.connect(connectionString, { connectTimeoutMS: 2000 })
    .then(() => console.log("database connected"))
    .catch(error => console.error(error));

    module.exports = connectionString;