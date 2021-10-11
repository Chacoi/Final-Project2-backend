const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const comentarioSchema = new Schema({
    comentario: String
},
{
    collection: 'comentarios'
});

module.exports = mongoose.model('Comentario', comentarioSchema);