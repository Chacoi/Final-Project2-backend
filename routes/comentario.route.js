const express = require('express');
const app = express();
const comentarioRoute = express.Router();

//Comentario model
const Comentario = require('../models/Comentario');

//Discusion model
const Discusion = require('../models/Discusion');

//Agregar comentario
comentarioRoute.route('/:id/comentario-create').post( async (req, res, next) => {
    const discusion = await Discusion.findById(req.params.id);
        if(discusion){
            Comentario.create(req.body, (error, data) => {
                if (error) {
                    return next(error);
                } else {
                    console.log(data);
                    discusion.comentarios.push(data);
                    discusion.save();
                    console.log('Informacion cargada correctamente');
                    res.json(data);
                }
            })
        }else{
            console.log("Discusion no encontrada");
        }
})

//Delete comentario
comentarioRoute.route('/comentario-delete/:id').delete((req, res, next) => {
    Comentario.findOneAndDelete(req.params.id, (error, data) => {
        if(error){
            return next(error);
        }else{
            res.status(200).json({
                msg: data
            })
        }
    })
})

module.exports = comentarioRoute;