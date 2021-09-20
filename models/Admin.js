// class Admin {
//     constructor(id, name, password, email) {
//         this.id = id;
//         this.name = name;
//         this.password = password;
//         this.email = email;
//     }
// }

// module.exports = Admin;

const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
    username: String,
    nombre: String,
    apellido: String,
    email: String,
    password: String,
    tipo: String
}, {
    timestamps: true,
    collection: 'users'
});

AdminSchema.methods.publicData = () => {
    return {
        id: this.id,
        username: this.username,
        email: this.email,
        nombre: this.nombre,
        apellido: this.apellido,
        tipo: this.tipo,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt
    };
};

mongoose.model("Administrator", AdminSchema);