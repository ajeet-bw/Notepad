const mongoose = require('mongoose');

const connect = function() {
    return new Promise((resolve, reject) => {
        mongoose.connect('mongodb://localhost:27017/UserDatabase', {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        }, err => {
            if (err) {
                reject(err);
            }
            resolve(true);
        });
    });

};

module.exports = { connect };