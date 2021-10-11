const express = require('express');
const app = express();
const discusionRoute = express.Router();


//Discusion model
const Discusion = require('../models/Discusion');

//Comunidad model
const Comunidad = require('../models/Comunidad');

//Obtener todas las discusione
discusionRoute.route('/:id/discusion-list').get( async (req, res) => {
    await Discusion.find((error, data) => {
        if(error){
            return next(error);
        }else{
            res.json(data);
        }
    });
});

//Obtener discusiones según interés
discusionRoute.route('/discusion-list/:tag').get( async (req, res, next) => {
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
    console.log(req.body.intereses)
    discusion = new Discusion(
        {   
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
    Discusion.findOneAndDelete(req.params.id, (error, data) => {
        if(error){
            return next(error);
        }else{
            res.status(200).json({
                msg: data
            })
        }
    })
})

module.exports = discusionRoute;