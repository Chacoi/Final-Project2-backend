const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const comentarioSchema = new Schema({
    idAutor: String,
    autor: String,
    comentario: String,
    valoracionMal: [{type: String}],
    valoracionBien: [{type: String}],
    rate: Number,
    fecha: Date
},
{
    collection: 'comentarios'
});

module.exports = mongoose.model('Comentario', comentarioSchema);