const { request } = require('express')
const mongoose = require('mongoose')
const Comment = mongoose.model('Comment')
const Movie = mongoose.model('Movie')
const User = mongoose.model('User')

async function createComment(req, res, next) {
    if (req.user.type !== "admin" && req.user.type !== "user") {
        return res.send('No está autorizado')
    }
    let comment = req.body
    const user = await User.findById(comment.userId)
    const movie = await Movie.findById(comment.movieId)

    const newComment = new Comment(comment)

    try {
        const savedComment = await newComment.save()
        movie.comments = movie.comments.concat(savedComment._id)
        movie.save()
        user.comments = user.comments.concat(savedComment._id)
        user.save()

        res.json(savedComment)
    }
    catch (error) {
        next(error)
    }
}

function getComment(req, res, next) {
    if (req.params.id) {
        Comment.findById(req.params.id)
            .then(comment => {
                res.send(comment)
            })
            .catch(next)
    }
    else {
        Comment.find()
            .then(comment => {
                res.send(comment)
            })
            .catch(next)
    }
}


function updateComment(req, res, next) {
    Comment.findById(req.params.id)
        .then(comment => {            
            if (!comment)
                return res.sendStatus(401)
            if (req.user.id != comment.userId) {
                return res.send('No se puede editar otro comentario que no sea el tuyo')
            }
            let newInfo = req.body
            // if (typeof newInfo.userId !== 'undefined')
            //     comment.userId = newInfo.userId
            // if (typeof newInfo.movieId !== 'undefined')
            //     comment.movieId = newInfo.movieId
            if (typeof newInfo.text !== 'undefined')
                comment.text = newInfo.text
            comment.save()
                .then(updated => {
                    res.status(201).json(updated.publicData())
                })
                .catch(next)
        })
        .catch(next)
}

function deleteComment(req, res, next) {
    if (req.user.type === "admin") {
        Comment.findOneAndDelete({ _id: req.params.id })
            .then(r => {
            res.status(200).send('El comentario se elimino')
            })
            .catch(next => {
                res.send('No se encontró ningun comentario con ese id')
            })
    }
    else {
        Comment.findById(req.params.id)
            .then(comment => {
                if (req.user.id != comment.userId) {
                    return res.send('No se puede eliminar otro comentario que no sea el tuyo')
                }
                else {
                    Comment.findOneAndDelete({ _id: req.params.id })
                        .then(r => {
                            res.status(200).send('El comentario se elimino')
                        })
                        .catch(next => {
                            res.send('No fue posible eliminar el comentario')
                        })
                }
            })
            .catch(next => {
                res.send('No se encontró ningun comentario con ese id')
            })
        
    }
}

module.exports = {
    createComment,
    getComment,
    updateComment,
    deleteComment
}