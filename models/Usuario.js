const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Interes = require('./Interes');
const Schema = mongoose.Schema;
const usuarioSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Este campo no puede permanecer en blanco']
    },
    password: {
        type: String,
        required: [true, 'La contrasena no puede permanecer en blanco']
    },
    intereses: [{ type: Schema.Types.ObjectId, ref: 'Interes'}]
})

// usuarioSchema.statics.findAndValidate = async function (username, password) {
//     const usuarioEncontrado = await this.findOne({ username });
//     const isValid = await bcrypt.compare(password, usuarioEncontrado.password);
//     return isValid ? usuarioEncontrado : false;
// }

// usuarioSchema.pre('save', async function (next) {
//     if(!this.isModified('password')) return next(); //Esta linea es para usar este mismo
//     this.password = await bcrypt.hash(this.password, 12); //mismo middleware para editar un usuario
//     next();
// })

module.exports = mongoose.model('User', usuarioSchema);