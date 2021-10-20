const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const comentarioSchema = new Schema({
    idAutor: String,
    comentario: String,
    valoracion: Boolean
},
{
    collection: 'comentarios'
});

module.exports = mongoose.model('Comentario', comentarioSchema);