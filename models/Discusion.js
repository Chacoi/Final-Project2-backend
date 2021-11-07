const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Comentario = require('./Comentario');



const discusionSchema = new Schema({
    idAutor: String,
    autor: String,
    titulo: String,
    contenido: String,
    valoracionMal: [{type: String}],
    valoracionBien: [{type: String}],
    comentarios: [{ type: Schema.Types.ObjectId, ref: 'Comentario'}],
    intereses: [{type: String}]
},
{
    collection: 'discusiones'
});

discusionSchema.post('findOneAndDelete', async function (discusion){
    if(discusion.comentarios.length){
        const res = await Comentario.deleteMany({ _id: {$in: discusion.comentarios}});
    }
})

module.exports = mongoose.model('Discusion', discusionSchema);
