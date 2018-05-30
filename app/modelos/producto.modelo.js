const mongoose = require('mongoose');

const ProductoSchema = mongoose.Schema({
    nombre: String
});

module.exports = mongoose.model('Producto', ProductoSchema);