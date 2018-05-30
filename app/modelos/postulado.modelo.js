const mongoose = require('mongoose');

const PostuladoSchema = mongoose.Schema({
    documeto: String,
    nombre: String,
    genero: String,
    edad: Number,
    user: String,
    pass: String
});

module.exports = mongoose.model('Postulado', PostuladoSchema);