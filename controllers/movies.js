const Movie = require('../models/Movie')

function createMovie(req, res) {

}

function getMovie(req, res) {
    let html;
    res.send(html = `<h1 style="color:DarkSlateBlue; text-align:center;">Movie information</h1>`);
}


function updateMovie(req, res) {

}

function deleteMovie(req, res) {

}

module.exports = {
    createMovie,
    getMovie,
    updateMovie,
    deleteMovie
}