const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const comentarioSchema = new Schema({
    idAutor: String,
    comentario: String,
    valoracionMal: [{type: String}],
    valoracionBien: [{type: String}]
},
{
    collection: 'comentarios'
});

module.exports = mongoose.model('Comentario', comentarioSchema);