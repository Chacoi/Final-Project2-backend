const express = require('express');
const app = express();
const userRoute = express.Router();
const User = require('../models/Usuario');
const Interes = require('../models/Interes');
const Discusion = require('../models/Discusion');
const bcrypt = require('bcrypt');



const requireLogin = (req, res, next) => {
    if (!req.session.user_id) {
        console.log(req.session);
        return console.log('Usuario no registrado');
    }
    next();
}

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

//Registrar usuario
userRoute.post('/register', async (req, res, next) => {
    const { password, username, email } = req.body;
    const hash = await bcrypt.hash(password, 12);
    const user = new User({ username, password: hash, email });
    await user.save();
    req.session.user_id = user._id;
    res.json(user);
    next();
})

//Cerrar sesion
userRoute.post('/logout', (req, res) => {
    req.session.destroy();
    res.end();
})

//Verificar usuario
userRoute.post('/login', async (req, res, next) => {
    console.log(req.body);
    const { username, password } = req.body;
    const usuarioEncontrado = await User.findOne({ username });
    const validPassword = await bcrypt.compare(password, usuarioEncontrado.password);
    if(validPassword) {
        console.log("Usuario validado correctamente");
        req.session.user_id = usuarioEncontrado._id;
        req.session.username = usuarioEncontrado.username;
        req.session.save(function (err){
            if(req.session.user_id){
                console.log("Si");
                
            }else{
                console.log("No");
            }
        });
        console.log(req.session);
        console.log(usuarioEncontrado._id);
        res.send();
    }else{
        console.log("Usted no esta en el sistema, vayase pa la casa");
    }
})

//Usuario activo
userRoute.route('/usuario-activo').get((req, res, next) => {
    const id = req.session.user_id
    User.findById(id, (error, data) => {
        if(error) {
            return next(error);
        }else{
            res.json(data);
        }
    }).populate('intereses');
})

//Agregar interés
userRoute.route('/interes-add').post( async (req, res, next) => {
    const usuario = await User.findById(req.session.user_id);
    console.log(usuario);
        if(usuario){
            Interes.create(req.body, (error, data) => {
                if (error) {
                    return next(error);
                } else {
                    console.log(data);
                    usuario.intereses.push(data);
                    usuario.save();
                    console.log('Informacion cargada correctamente');
                    res.json(data);
                }
            })
        }else{
            console.log("Discusion no encontrada");
        }
});

//Eliminar interés
userRoute.route('/interes-delete/:id').delete((req, res, next) => {
    Interes.findOneAndDelete(req.params.id, (error, data) => {
        if(error){
            return next(error);
        }else{
            res.status(200).json({
                msg: data
            })
        }
    })
})

//Obtener intereses
userRoute.route('/intereses').get( async (req, res) => {
    const id = req.session.user_id
    Discusion.findById(id, (error, data) => {
        if(error) {
            return next(error);
        }else{
            res.json(data);
        }
    }).populate('intereses');
});

module.exports = userRoute;