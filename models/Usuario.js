const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const usuarioSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    permisos: {
        type: String
    },
    image: {
        type: Schema.Types.Mixed
    },
    score: {
        type: Number
    },
    medalla: {
        type: String
    },
    intereses: [{ type: Schema.Types.ObjectId, ref: 'Interes'}]
});

usuarioSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', usuarioSchema);