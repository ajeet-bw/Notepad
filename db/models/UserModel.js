const mongoose = require("mongoose");
const Promise = require("bluebird");
const User = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    userData: {
        type: [{
            subject: { type: String },
            title: { type: String },
            description: { type: String },
            date: { type: Date },
            cost: { type: Number }
        }]
    }
});

const Account = mongoose.model("User", User, "User");
Promise.promisifyAll(Account)
Promise.promisifyAll(Account.prototype)
module.exports = Account;