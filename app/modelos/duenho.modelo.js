const mongoose = require('mongoose');

const DuenhoSchema = mongoose.Schema({
    documento: String,
    nombre: String,
    genero: String,
    edad: Number,
    user: String,
    pass: String,
    terrenos: []
});

module.exports = mongoose.model('Duenho', DuenhoSchema);