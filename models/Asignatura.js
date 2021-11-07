const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Comentario = require('./Comentario');


const asignaturaSchema = new Schema({
    nombre: String,
    clave: String,
    descripcion: String,
    
    comentarios: [{ type: Schema.Types.ObjectId, ref: 'Comentario'}]
},
{
    collection: 'asignaturas'
});

module.exports = mongoose.model('Asignatura', asignaturaSchema);