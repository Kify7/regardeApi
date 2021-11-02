// Clase que representa una película
const mongoose = require('mongoose')

const MovieSchema = new mongoose.Schema({
    title: { type: String, required: true, index: true },
    genres: [String],
    year: {type: String, maxlength: 4},
    directors: [String],
    cast: [String],
    poster: {type: String},
    description: {type: String, required: true},
    rate: {type: Number, min: 0, max: 5},
    trailer: { type: String },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId, ref: 'Comment', autopopulate: true
        }
    ]
}, { collection: 'movies', timestamps: true })
MovieSchema.plugin(require('mongoose-autopopulate'));

MovieSchema.methods.publicData = function() {
    return {
        id: this.id,
        title: this.title,
        genres: this.genres,
        year: this.year,
        directors: this.directors,
        cast: this.cast,
        poster: this.poster,
        description: this.description,
        rate: this.rate,
        trailer: this.trailer
    }
}

mongoose.model('Movie', MovieSchema)