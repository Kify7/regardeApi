// Clase que representa un comentario
const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
    userId: String,
    // userId: {
    //     type: mongoose.Schema.Types.ObjectId, ref: 'User'
    // },
    movieId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Movie'
    },
    text: {
        type: String
    }
}, { collection: 'comments', timestamps: true })

CommentSchema.methods.publicData = function() {
    return {
        id: this.id,
        userId: this.userId,
        movieId: this.movieId,
        text: this.text
    }
}

mongoose.model('Comment', CommentSchema)