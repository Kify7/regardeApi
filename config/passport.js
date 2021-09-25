const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const User = mongoose.model('User')

passport.use('user-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, function (email, password, next) {
    User.findOne({
            email: email
        })
        .then(function (user) {
            if (!user || !user.validatePassword(password)) {
                return next(null, false, {
                    error: {
                        'email o contraseña': 'equivocado(a)'
                    }
                })
            }
            return next(null, user)
        })
        .catch(next)
}))