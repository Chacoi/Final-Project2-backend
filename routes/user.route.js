const express = require('express');
const app = express();
const userRoute = express.Router();
const User = require('../models/Usuario');
const Interes = require('../models/Interes');
const Discusion = require('../models/Discusion');
const bcrypt = require('bcrypt');
const passport = require('passport');
const isLoggedIn = require('../middleware');
const usuarios = require('../controllers/usuarios');
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
});



// //Obtener todas las comunidades
// userRoute.route('/').get( requireLogin, async (req, res) => {
//         await Comunidad.find((error, data) => {
//             if(error){
//                 return next(error);
//             }else{
//                 console.log(req.session);
//                 res.json(data);
//             }
//         });
    
    
// });
//Ver todos los usuarios
userRoute.get('/user-list', usuarios.list)

//Eliminar usuario de la BD
userRoute.route('/usuario-delete/:id').delete(usuarios.delete);

//Registrar usuario
userRoute.post('/register', usuarios.register);

//Cerrar sesion
userRoute.get('/logout', usuarios.logout);

//Verificar usuario
userRoute.post('/login', passport.authenticate('local'), usuarios.login);

//Usuario activo
userRoute.route('/usuario-activo').get(usuarios.active)

//Agregar interés
userRoute.route('/interes-add').post( usuarios.addInteres);

//Eliminar interés
userRoute.route('/interes-delete/:id').delete(usuarios.delInteres);

//Obtener intereses
userRoute.route('/intereses').get(usuarios.getInteres);

//Dar rol de moderador a un usuario
userRoute.route('/dar-privilegio/:id').put(usuarios.permissions);

module.exports = userRoute;