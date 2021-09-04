const Comment = require('../models/Comment');

function createComment(req, res) {

}

function getComment(req, res) {
    let html;
    res.send(html = `<h1 style="color:red; text-align:center;">Coment Information</h1>`);
}


function updateComment(req, res) {

}

function deleteComment(req, res) {

}

module.exports = {
    createComment,
    getComment,
    updateComment,
    deleteComment
}