const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Discusion = require('./Discusion');


const comunidadSchema = new Schema({
    nombre: String,
    tema: String,
    discusiones: [{ type: Schema.Types.ObjectId, ref: 'Discusion'}]
},
{
    collection: 'comunidades'
});

module.exports = mongoose.model('Comunidad', comunidadSchema);