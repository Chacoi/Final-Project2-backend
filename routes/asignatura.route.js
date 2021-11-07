const express = require('express');
const app = express();
const asignaturaRoute = express.Router();

const Asignatura = require('../models/Asignatura');

//Obtener todas las asignaturas
asignaturaRoute.route('/asignatura-list').get( async (req, res) => {
    console.log("Obtener todas las asignaturas");
    await Asignatura.find((error, data) => {
        if(error){
            return next(error);
        }else{
            res.json(data);
        }
    });
});

//Agregar asignatura
asignaturaRoute.route('/asignatura-create').post( async (req, res, next) => {
    console.log(req.body);
    asignatura = new Asignatura(
        {   
            nombre: req.body.nombre,
            clave: req.body.clave,
            descripcion: req.body.descripcion,
            puntuacion: 0
        }
    );
        Asignatura.create(asignatura, (error, data) => {
            if (error) {
                return next(error);
            } else {
                console.log('Informacion cargada correctamente');
                console.log(data);
                res.json(data);
            }
        });
});

//Actualizar asignatura
asignaturaRoute.route('/asignatura-update/:id').put((req, res, next) => {
    console.log("actualizar discusion")
    Asignatura.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if(error){
            return next(error)
        }else{
            res.end();
        }
    });
});

//Delete asignatura
asignaturaRoute.route('/asignatura-delete/:id').delete((req, res, next) => {
    console.log("borrar discusion")
    Asignatura.findOneAndDelete(req.params.id, (error, data) => {
        if(error){
            return next(error);
        }else{
            console.log("disusión eliminada correctamente");
            res.status(200).json({
                msg: data
            })
        }
    })
});

module.exports = asignaturaRoute;