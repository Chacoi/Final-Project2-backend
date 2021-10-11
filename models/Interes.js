const mongoose = require('mongoose');
const interesSchema = new mongoose.Schema({
    nombre: String,
    descripcion: String
},
{
    collection: 'intereses'
});

module.exports = mongoose.model('Interes', interesSchema)