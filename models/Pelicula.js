// Clase que representa una película

class Movie {
    constructor(
        id,
        title,
        genres = [],
        year,
        directors = [],
        cast = [],
        poster,
        description,
        ranking,
        comments = [],
        trailer
    ) {
        this.id = id;
        this.title = title;
        this.genres = genres;
        this.year = year;
        this.directors = directors;
        this.cast = cast;
        this.poster = poster;
        this.description = description;
        this.ranking = ranking;
        this.comments = comments;
        this.trailer = trailer;
    }
};

module.exports = Movie;