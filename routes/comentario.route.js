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
    comentario = new Comentario({
        idAutor: req.user._id,
        comentario: req.body.comentario
    });
        if(discusion){
            Comentario.create(comentario, (error, data) => {
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

//Valorar comentario
comentarioRoute.route('/comentario-valorar/:id').put((req, res, next) => {
    console.log("Valorar comentario");
     Comentario.findByIdAndUpdate(req.params.id, {
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

//Contar valoraciones
comentarioRoute.route('/comentario-count').get( async (req, res, next) => {
    idUsuario = req.user._id;
    await Comentario.find({idAutor: idUsuario, valoracion: true}, (error, data) => {
        if(error){
            console.log("Discusion no encontrada")
            return next(error);
        }else{
            console.log(data)
            res.json(data);
        }
    });
})

//Comentarios según usuario activo
comentarioRoute.route('/comentario-user-list').get( async (req, res) => {
    console.log("Obtener todas las discusiones");
    await Comentario.find({idAutor: req.user._id},(error, data) => {
        if(error){
            return next(error);
        }else{
            res.json(data);
        }
    });
});

module.exports = comentarioRoute;