const mongoose = require('mongoose')
const User = mongoose.model('User')
const passport = require('passport')

function createUser(req, res, next) {
    const body = req.body,
        password = body.password

    delete body.password
    const newUser = new User(body)

    newUser.createPassword(password)
    newUser.save()
        .then(user => {
            return res.status(200).json(user.toAuthJSON())
        })
        .catch(next)
}

function getUser(req, res, next) {
    if (req.params.id) {
        User.findById(req.user.id)
            .then(user => {
                if (!user) {
                    return res.sendStatus(401)
                }
                return res.json(user.publicData())
            })
            .catch(next)
    } else {
        User.find()
            .then(users => {
                res.send(users)
            })
            .catch(next)
    }

}

function updateUser(req, res, next) {
    User.findById(req.user.id).then(user => {
        if (!user) {
            return res.sendStatus(401)
        }
        let newInfo = req.body
        if (typeof newInfo.username !== 'undefined')
            user.username = newInfo.username

        if (typeof newInfo.name !== 'undefined')
            user.name = newInfo.name

        if (typeof newInfo.lastname !== 'undefined')
            user.lastname = newInfo.lastname

        if (typeof newInfo.email !== 'undefined')
            user.email = newInfo.email

        if (typeof newInfo.type !== 'undefined')
            user.type = newInfo.type

        if (typeof newInfo.password !== 'undefined')
            user.createPassword(newInfo.password)

        user.save().then(updatedUser => {
            res.status(201).json(updatedUser.publicData())
        }).catch(next)
    }).catch(next)
}

function deleteUser(req, res, next) {
    User.findOneAndDelete({
            _id: req.user.id
        })
        .then(r => {
            res.status(200).send('Usuario eliminado')
        })
        .catch(next)
}

function logIn(req, res, next) {
    if (!req.body.email) {
        return res.status(422).json({
            error: {
                email: 'Falta información'
            }
        })
    }

    if (!req.body.password) {
        return res.status(422).json({
            error: {
                password: "No puede estar vacío"
            }
        })
    }

    passport.authenticate('user-login', {
            session: false
        },
        function (err, user, info) {
            if (err) {
                return next(err)
            }
            if (user) {
                user.token = user.generateJWT()
                return res.json({
                    user: user.toAuthJSON()
                })

            } else {
                return res.status(422).json(info)
            }
        })(req, res, next)
}

module.exports = {
    createUser,
    getUser,
    updateUser,
    deleteUser,
    logIn
}