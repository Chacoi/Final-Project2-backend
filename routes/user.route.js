const express = require('express');
const app = express();
const userRoute = express.Router();
const User = require('../models/Usuario');
const Interes = require('../models/Interes');
const Discusion = require('../models/Discusion');
const bcrypt = require('bcrypt');
const passport = require('passport');
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

//Registrar usuario
userRoute.post('/register', async (req, res, next) => {
    const { password, username, email } = req.body;
    const user = new User({ username, email });
    registeredUser = await User.register(user, password);
    req.logIn(reqgisteredUser, err => {
        if(err) return next(err);
        console.log("Inicio de sesión correcto");
        res.json(user);
        next();
    })
})

//Cerrar sesion
userRoute.get('/logout', (req, res) => {
    console.log("cerrar sesión");
    req.logout();
    res.end();
})

//Verificar usuario
userRoute.post('/login', passport.authenticate('local'),async (req, res, next) => {
    res.end();
})

//Usuario activo
userRoute.route('/usuario-activo').get((req, res, next) => {
    if(req.user){
        User.findOne({username: req.user.username}, (error, data) => {
            if(error) {
                return next(error);
            }else{
                console.log(data);
                res.json(data);
            }
        }).populate('intereses');
    }else{
        res.end()
    }
   
})

//Agregar interés
userRoute.route('/interes-add').post( async (req, res, next) => {
    const usuario = await User.findById(req.user._id);
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
    const id = req.user._id
    Discusion.findById(id, (error, data) => {
        if(error) {
            return next(error);
        }else{
            res.json(data);
        }
    }).populate('intereses');
});

module.exports = userRoute;