const mongoose = require("mongoose")
const Administrator = mongoose.model("Administrator")
const passport = require('passport')
const Movie = mongoose.model('Movie')

function createAdmin(req, res, next) {
    const body = req.body,
        password = body.password
    
    delete body.password
    const newAdmin = new Administrator(body)

    newAdmin.createPassword(password)
    newAdmin.save()
        .then(admin => {
            return res.status(200).json(admin.toAuthAdminJSON())
        })
        .catch(next)
}

function getAdmin(req, res, next) {
    if (req.params.id) {
        Administrator.findById(req.user.id)
            .then(admin => {
                if (!admin) {
                    return res.sendStatus(401)
                }
                return res.json(admin.publicData())
            })
            .catch(next)
    }
    else {
        Administrator.find()
            .then(admins => {
                res.send(admins)
            })
            .catch(next)
    }
}


function updateAdmin(req, res, next) {
    Administrator.findById(req.user.id).then(admin => {
        if (!admin) { return res.sendStatus(401) }
        let newInfo = req.body
        if (typeof newInfo.username !== 'undefined')
            admin.username = newInfo.username

        if (typeof newInfo.name !== 'undefined')
            admin.name = newInfo.name

        if (typeof newInfo.lastname !== 'undefined')
            admin.lastname = newInfo.lastname

        if (typeof newInfo.email !== 'undefined')
            admin.email = newInfo.email

        if (typeof newInfo.type !== 'undefined')
            admin.type = newInfo.type

        if (typeof newInfo.password !== 'undefined')
            admin.createPassword(newInfo.password)

        admin.save().then(updatedAdmin => {
            res.status(201).json(updatedAdmin.publicData())
        }).catch(next)
    }).catch(next)
}

function deleteAdmin(req, res, next) {
    Administrator.findOneAndDelete({ _id: req.user.id })
        .then(r => {
            res.status(200).send(`Administrador ${req.params.id} eliminado: ${r}`);
            
        })
        .catch(next)
}

function logIn(req, res, next) {
    if (!req.body.email) {
        return res.status(422).json({ error: { email: 'Falta información' } })
    }

    if (!req.body.password) {
        return res.status(422).json({ error: { password: "No puede estar vacío" } })
    }
    
    passport.authenticate('admin-login',
        { session: false },
        function (err, admin, info) {
            if (err) { return next(err) }
            if (admin) {
                admin.token = admin.generateJWT()
                return res.json({ admin: admin.toAuthAdminJSON() })
            }
            else {
                return res.status(422).json(info)
            }
        })(req, res, next)
}

function createMovie(req, res, next) {
    Administrator.findById(req.params.adminId)
        .then(movie => {
            if (!movie) {
                return res.sendStatus(401)
            }
            let newMovie = new Movie(req.body)
            newMovie.save()
                .then(mov => {
                    res.status(200).send(mov)
                })
                .catch(next)
        })
        .catch(next)
}

function getMovie(req, res, next) {
    Administrator.findById(req.params.adminId)
        .then(admin => {
            if (!admin) {
                return res.sendStatus(401)
            }
            if (req.params.id) {
                Movie.findById(req.params.id)
                    .then(movie => {
                        res.send(movie)
                    })
                    .catch(next)
            }
            else {
                Movie.find()
                    .then(movies => {
                        res.send(movies)
                    })
                    .catch(next)
            }
        })
        .catch(next)
    
}


function updateMovie(req, res, next) {
    Administrator.findById(req.params.adminId)
        .then(admin => {
            if (!admin) {
                return res.sendStatus(401)
            }
            Movie.findById(req.params.id)
                .then(movie => {
                    if (!movie)
                        return res.sendStatus(401)
                    let newData = req.body
                    if (typeof newData.title !== 'undefined')
                        movie.title = newData.title
                    if (typeof newData.genres !== 'undefined')
                        movie.genres = newData.genres
                    if (typeof newData.year !== 'undefined')
                        movie.year = newData.year
                    if (typeof newData.directors !== 'undefined')
                        movie.directors = newData.directors
                    if (typeof newData.cast !== 'undefined')
                        movie.cast = newData.cast
                    if (typeof newData.poster !== 'undefined')
                        movie.poster = newData.poster
                    if (typeof newData.description !== 'undefined')
                        movie.description = newData.description
                    if (typeof newData.ranking !== 'undefined')
                        movie.ranking = newData.ranking
                    if (typeof newData.trailer !== 'undefined')
                        movie.trailer = newData.trailer
                    movie.save()
                        .then(updated => {
                            res.status(201).json(updated.publicData())
                        })
                        .catch(next)
                })
                .catch(next)
        })
        .catch(next)
}

function deleteMovie(req, res, next) {
    Administrator.findById(req.params.adminId).then(admin => {
        if (!admin) {
                return res.sendStatus(401)
        }
        Movie.findOneAndDelete({ _id: req.params.id })
            .then(deleted => {
                res.status(200).send('The movie was deleted.')
            })
            .catch(next)
    })
        .catch(next)
    
}


module.exports = {
    createAdmin,
    getAdmin,
    updateAdmin,
    deleteAdmin,
    logIn,
    createMovie,
    getMovie,
    updateMovie,
    deleteMovie
}