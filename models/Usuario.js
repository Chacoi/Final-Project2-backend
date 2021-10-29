const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const usuarioSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    intereses: [{ type: Schema.Types.ObjectId, ref: 'Interes'}]
});

usuarioSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', usuarioSchema);