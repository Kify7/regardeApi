const Admin = require('../models/Admin')

function createAdmin(req, res) {

}

function getAdmin(req, res) {
    let html;
    res.send(html = `<h1 style="color:green; text-align:center;">Admin information</h1>`);
}


function updateAdmin(req, res) {

}

function deleteAdmin(req, res) {

}

module.exports = {
    createAdmin,
    getAdmin,
    updateAdmin,
    deleteAdmin
}