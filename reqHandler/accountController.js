const Account = require('../db/models/UserModel');
const { Mail, loginMail } = require('./Mail')

function signup(req, res) {
    Account.findOneAsync({ 'email': req.body.email })
        .then(found => {
            if (found) {
                throw { code: 409, message: 'You already have an account.' };
            }
            Mail(req.body.username, req.body.email, req.body.password, 'Registration Successful')
            return new Account({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                userData: req.body.userData
            }).saveAsync();
        })
        .then(saved => {
            res.status(200).json('Account created.');
        })
        .catch(err => {
            res.status(err.code ? err.code : 500).json(err.message ? err.message : err);
        });
}

function signin(req, res) {
    Account.findOneAsync({ email: req.body.email })
        .then(found => {
            if (!found) {
                throw { code: 409, message: 'No such account exists' };
            }
            if (found.password === req.body.password) {
                loginMail(req.body.email, 'Login to Notepad')
                res.status(200).json('Login successful.');
            } else {
                throw { code: 409, message: 'Wrong credentials.' };
            }

        })
        .catch(err => {
            res.status(err.code ? err.code : 500).json(err.message ? err.message : err);
        });
}

function note(req, res) {
    Account.findOneAndUpdateAsync({ email: req.body.email }, {
            $push: {
                userData: req.body.userData
            }
        })
        .then(saved => {
            res.status(200).json('Note Added');
        })
        .catch(err => {
            res.status(err.code ? err.code : 500).json(err.message ? err.message : err);
        });
}

function notes(req, res) {
    Account.findOneAsync({ email: req.body.email })
        .then(found => {
            if (!found) {
                throw { code: 409, message: 'No such account exists' };
            }
            res.status(200).json(found.userData);
        })
        .catch(err => {
            res.status(err.code ? err.code : 500).json(err.message ? err.message : err);
        });
}


module.exports = { signup, signin, note, notes }