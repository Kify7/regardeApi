const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const secret = require('../config').secret;

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        lowercase: true,
        required: [true, "no puede estar vacío"],
        match: [/^[a-zA-Z0-9]+$/, "es inválido"],
        index: true,
    },
    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: [true, "no puede estar vacío"],
        match: [/\S+@\S+\.\S+/, "es inválido"],
        index: true,
    },
    type: {
        type: String,
        enum: ['user', 'admin']
    },
    hash: String,
    salt: String,
}, {
    timestamps: true,
    collection: 'users'
});

UserSchema.plugin(uniqueValidator, {
    message: "Ya existe"
})

UserSchema.methods.createPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512')
        .toString("hex")
}

UserSchema.methods.validatePassword = function (password) {
    const newHash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512')
        .toString('hex')
    return this.hash === newHash
}

UserSchema.methods.generateJWT = function () {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign({
        id: this._id,
        username: this.username,
        type: this.type,
        exp: parseInt(exp.getTime() / 1000),
    }, secret)
}

UserSchema.methods.toAuthUserJSON = function () {
    return {
        id: this._id,
        username: this.username,
        email: this.email,
        token: this.generateJWT()
    }
}

UserSchema.methods.publicData = function () {
    return {
        id: this.id,
        username: this.username,
        email: this.email,
        name: this.name,
        lastname: this.lastname,
        type: this.type,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt
    }
}

mongoose.model("User", UserSchema);