const mongoose = require("mongoose")
const Administrator = mongoose.model("Administrator")


function createAdmin(req, res, next) {
    var administrador = new Administrator(req.body)
    administrador.save().then(admin => {
        res.status(201).send(admin)
    }).catch(next)
}

function getAdmin(req, res, next) {
    if (req.params.id) {
        Administrator.findById(req.params.id).then(admin => {
            res.send(admin)
        }).catch(next)
    }
}


function updateAdmin(req, res) {

}

function deleteAdmin(req, res) {
    Administrator.findOneAndDelete({
        _id: req.params.id
    }).then(r => {
        res.status(200).send(`Administrator ${req.params.id} eliminado: ${r}`);
    })
}


module.exports = {
    createAdmin,
    getAdmin,
    updateAdmin,
    deleteAdmin
}