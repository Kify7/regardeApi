const { request } = require('express')
const mongoose = require('mongoose')
const Comment = mongoose.model('Comment')
const Movie = mongoose.model('Movie')

async function createComment(req, res, next) {
    let comment = req.body
    const movie = await Movie.findById(comment.movieId)

    const newComment = new Comment(comment)

    try {
        const savedComment = await newComment.save()
        movie.comments = movie.comments.concat(savedComment._id)
        movie.save()

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
            let newInfo = req.body
            if (typeof newInfo.userId !== 'undefined')
                comment.userId = newInfo.userId
            if (typeof newInfo.movieId !== 'undefined')
                comment.movieId = newInfo.movieId
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
    Comment.findOneAndDelete({ _id: req.params.id })
        .then(r => {
            res.status(200).send('La solicitud se elimino')
        })
        .catch(next)
}

module.exports = {
    createComment,
    getComment,
    updateComment,
    deleteComment
}