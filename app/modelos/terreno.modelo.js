const mongoose = require('mongoose');

const TerrenoSchema = mongoose.Schema({
    codigo: String,
    extension: Number,
    productos:[],
    postulados:[]
});

module.exports = mongoose.model('Terreno', TerrenoSchema);