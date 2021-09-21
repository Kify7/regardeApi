// Clase que representa una película
const mongoose = require('mongoose')

const MovieSchema = new mongoose.Schema({
    title: { type: String, required: true, index: true },
    genres: [String],
    year: {type: String, maxlength: 4},
    directors: [String],
    cast: [String],
    poster: {type: String},
    description: {type: String, require: true},
    ranking: {type: Number, min: 0, max: 5},
    trailer: {type: String}
}, { collection: 'movies', timestamps: true })

MovieSchema.methods.publicData = () => {
    return {
        id: this.id,
        title: this.title,
        genres: this.genres,
        year: this.year,
        directors: this.directors,
        cast: this.cast,
        poster: this.poster,
        description: this.description,
        ranking: this.ranking,
        trailer: this.trailer
    }
}

mongoose.model('Movie', MovieSchema)

// class Movie {
//     constructor(
//         id,
//         title,
//         genres = [],
//         year,
//         directors = [],
//         cast = [],
//         poster,
//         description,
//         ranking,
//         comments = [],
//         trailer
//     ) {
//         this.id = id;
//         this.title = title;
//         this.genres = genres;
//         this.year = year;
//         this.directors = directors;
//         this.cast = cast;
//         this.poster = poster;
//         this.description = description;
//         this.ranking = ranking;
//         this.comments = comments;
//         this.trailer = trailer;
//     }
// };

// module.exports = Movie;