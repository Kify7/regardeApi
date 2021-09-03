const Coment = require('../models/Coment');

function createComent(req, res) {

}

function getComent(req, res) {
    let html;
    res.send(html = `<h1 style="color:red; text-align:center;">Coment Information</h1>`);
}


function updateComent(req, res) {

}

function deleteComent(req, res) {

}

module.exports = {
    createComent,
    getComent,
    updateComent,
    deleteComent
}