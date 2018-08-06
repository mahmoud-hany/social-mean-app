const mongoose = require('mongoose');
const dbUrl = require('../config/keys').mongoURI;

mongoose.Promise = global.Promise;

mongoose.connect(dbUrl, {useNewUrlParser: true}).then( () => {
    console.log('Connected to the MongoDB');
}).catch( () => {
    console.log('Connection Faild');
});

module.exports = { mongoose };