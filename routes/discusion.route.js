const express = require('express');
const app = express();
const discusionRoute = express.Router();


//Discusion model
const Discusion = require('../models/Discusion');

//Comunidad model
const Comunidad = require('../models/Comunidad');

//Obtener todas las discusione
discusionRoute.route('/:id/discusion-list').get( async (req, res) => {
    console.log("Obtener todas las discusiones");
    await Discusion.find((error, data) => {
        if(error){
            return next(error);
        }else{
            res.json(data);
        }
    });
});

//Obtener discusiones según usuario activo
discusionRoute.route('/discusion-user-list').get( async (req, res) => {
    console.log("Obtener todas las discusiones");
    await Discusion.find({idAutor: req.session.user_id},(error, data) => {
        if(error){
            return next(error);
        }else{
            res.json(data);
        }
    });
});

//Obtener discusiones según interés
discusionRoute.route('/discusion-list/:tag').get( async (req, res, next) => {
    console.log("obtener discusiones según interés");
    await Discusion.find({intereses: { $in: [req.params.tag]}}, (error, data) => {
        if(error){
            return next(error);
        }else{
            console.log(data)
            res.json(data);
        }
    });
});

//Agregar discusion
discusionRoute.route('/discusion-create').post( async (req, res, next) => {
    console.log(req.body.contenido);
    console.log(req.body.intereses);
    discusion = new Discusion(
        {   
            idAutor: req.session.user_id,
            autor: req.session.username,
            titulo: req.body.contenido.titulo,
            contenido: req.body.contenido.contenido,
            intereses: req.body.intereses
        }
    );
        Discusion.create(discusion, (error, data) => {
            if (error) {
                
                return next(error);
            } else {
                console.log('Informacion cargada correctamente');
                console.log(data);
                res.json(data);
            }
        });
});

//Obtener discusion
discusionRoute.route('/discusion-read/:id').get((req, res, next) => {
    console.log("obtener discusion")
    Discusion.findById(req.params.id, (error, data) => {
        if(error) {
            return next(error);
        }else{
            res.json(data);
        }
    }).populate('comentarios');
});

//Actualizar discusion
discusionRoute.route('/discusion-update/:id').put((req, res, next) => {
    console.log("actualizar discusion")
    Discusion.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if(error){
            return next(error)
        }else{
            res.json(data);
        }
    });
});

//Delete discusion
discusionRoute.route('/discusion-delete/:id').delete((req, res, next) => {
    console.log("borrar discusion")
    Discusion.findOneAndDelete(req.params.id, (error, data) => {
        if(error){
            return next(error);
        }else{
            res.status(200).json({
                msg: data
            })
        }
    })
});

//Valorar discusion
discusionRoute.route('/discusion-valorar/:id').put((req, res, next) => {
    console.log("Valorar discusion");
     Discusion.findByIdAndUpdate(req.params.id, {
         $set: { valoracion: req.body.valoracion }
     }, (error, data) => {
         if(error){
             console.log("Hay un error compare");
             return next(error);
         }else{
             console.log(data)
             res.json(data);
         }
     });
});

//Cuantificar valoraciones
discusionRoute.route('/discusion-count').get( async (req, res, next) => {
    idUsuario = req.session.user_id;
    await Discusion.find({idAutor: idUsuario, valoracion: true}, (error, data) => {
        if(error){
            console.log("Discusion no encontrada")
            return next(error);
        }else{
            console.log(data)
            res.json(data);
        }
    });
})

module.exports = discusionRoute;