const mongoose = require('mongoose')
const Movie = mongoose.model('Movie')
// const Comment = mongoose.model('Comment')

function createMovie(req, res, next) {
    if (req.user.type !== "admin") {
        return res.sendStatus(401)
    }
    var movie = new Movie(req.body)
    movie.save()
        .then(movie => {
            res.status(200).send(movie)
        })
        .catch(next)
}

function getMovie(req, res, next) {
    if (req.params.id) {
        Movie.findById(req.params.id)
            .then(movie => {
                res.send(movie)
            })
            .catch(next)
    } else {
        Movie.find()
            .then(movies => {
                res.send(movies)
            })
            .catch(next)
    }
}

function moviebyName(req, res, next) {
    var movieName = req.params.name
    console.log(req)
    Movie.find({
            title: movieName
        })
        .then(movie => {
            console.log(movie)
            res.send(movie)
        }).catch(next)
}

function updateMovie(req, res, next) {
    if (req.user.type !== "admin") {
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
}

function deleteMovie(req, res, next) {
    if (req.user.type !== "admin") {
        return res.sendStatus(401)
    }
    Movie.findOneAndDelete({
            _id: req.params.id
        })
        .then(deleted => {
            res.status(200).send('The movie was deleted.')
        })
        .catch(next)
}

function movieByCategory(req,res,next){
    var category = req.params.genres
    Movie.find({
        genres: category
    }) .then(r =>{
          res.status(200).send(r)
      })
      .catch(next)
}

function getTop5(req,res,next){
    req.body
    Movie.aggregate([
        {
          '$sort': {
            'rate': -1
          }
        }, {
          '$limit': 5
        }, {
          '$project': {
            'title': 1, 
            'year': 1, 
            '_id': 0
          }
        }
      ]) .then(r =>{
          res.status(200).send(r)
      }).catch(next)
}

function getRecents(req,res,next){
    req.body
    Movie.aggregate([
        {
          '$project': {
            'title': 1, 
            'year': 1
          }
        }, {
          '$sort': {
            'year': -1
          }
        }, {
          '$limit': 5
        }
      ]) .then(r =>{
          res.status(200).send(r)
      }).catch(next)
}

module.exports = {
    createMovie,
    getMovie,
    updateMovie,
    deleteMovie,
    moviebyName,
    movieByCategory,
    getTop5,
    getRecents
}