require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserModel = require('../models/User');

exports.login = (req, res, next) => {
    UserModel.findOne({ login: req.body.login })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Paire login/password incorrecte !' });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            process.env.RANDOM_SECRET_TOKEN,
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

// CREATE
exports.createUser = (req, res, next) => {
    bcrypt.hash(req.body.password, 10) // 10 : The number of rounds to secure the hash (Commonly ranges from 5 to 15)
        .then(hash => {
            const user = new UserModel({
                login: req.body.login,
                email: req.body.email,
                password: hash
            });
            user.save()
                .then(() => res.status(201).json({ message: `Utilisateur ${user.login} enregistré !`, user }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};
// DELETE
exports.deleteUser = (req, res, next) => {
    UserModel.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: `Utilisateur supprimé !`}))
        .catch(error => res.status(400).json({ error }));
};
// READ ONE
exports.getOneUser = (req, res, next) => {
    UserModel.findOne({ _id: req.params.id })
        .then(user => res.status(200).json(user))
        .catch(error => res.status(404).json({ error }));
};
// READ ALL
exports.getAllUsers = (req, res, next) => {
    UserModel.find()
        .then(users => res.status(200).json(users))
        .catch(error => res.status(400).json({ error }));
};
