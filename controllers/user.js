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
    if (req.user.type === "admin") {
        if (req.params.id) {
            User.findById(req.params.id)
                .then(user => res.json(user.publicData()))
                .catch(next => res.send('Usuario no encontrado'))
        } else {
            User.find().then(users => res.send(users))
                .catch(next)
        }
    } else if (req.params.id === req.user.id) {
        User.findById(req.params.id)
            .then(user => res.json(user.publicData()))
            .catch(next => res.send('Usuario no encontrado'))
    } else {
        return res.sendStatus(401)
    }
}

function updateUser(req, res, next) {
    if (req.params.id === req.user.id) {
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
    } else {
        return res.sendStatus(401)
    }
}

function deleteUser(req, res, next) {
    User.findById(req.params.id).then(user => {
       if (!user) {
        return res.send('El usuario no existe')
        }
    })
    if (req.user.type === "admin") {
        User.findOneAndDelete({
                _id: req.params.id
            })
            .then(r => {
                res.status(200).send('Usuario eliminado')
            })
            .catch(next)
    } else {
        return res.sendStatus(401)
    }
}

function deleteAccount(req, res, next) {
    User.findById(req.user.id).then(user => {
       if (!user) {
        return res.send('El usuario no existe')
        }
    })
    if (req.user.type === "admin" || req.user.type === "user") {
        User.findOneAndDelete({
                _id: req.user.id
            })
            .then(r => {
                res.status(200).send('Usuario eliminado')
            })
            .catch(next)
    } else {
        return res.sendStatus(401)
    }
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

async function addToFavorites(req, res, next) {
    const id = req.user.id
    const { movie } = req.body
    if (req.params.id != id) {
        return res.send('Error')
    }
    const existe = await User.findOne({ favorites: movie })
    console.log(existe);
    if (existe) {
        return res.send('Ya estaba en la lista de favoritos')
    }

    try {
        const favoritesupdated = await User.findByIdAndUpdate(id, {
            $push: { favorites: movie }
        })
        res.send('Se agregó a la lista de favoritos')
    } catch (next) {
        next(error => {
            return res.send('No se puede agregar a favoritos')
        })
    }
    
}

async function removeFromFavorites(req, res, next) {
    const id = req.user.id
    const { movie } = req.body
    if (req.params.id != id) {
        return res.send('Error')
    }
    const existe = await User.findOne({ favorites: movie })
    if (!existe) {
        return res.send('La película no se encuentraba en favoritos')
    }
    try {
        const favoritesupdated = await User.findByIdAndUpdate(id, {
            $pull: { favorites: movie }
        })
        res.send('Se eliminó de la lista de favoritos')
    } catch (next) {
        next(error => {
            return res.send('No se puede eliminar de favoritos')
        })
    }
}

module.exports = {
    createUser,
    getUser,
    updateUser,
    deleteUser,
    deleteAccount,
    logIn,
    addToFavorites,
    removeFromFavorites
}