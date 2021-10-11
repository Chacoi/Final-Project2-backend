const express = require('express');
const app = express();
const resenaRoute = express.Router();

//Obtener todas las discusione
resenaRoute.route('/:id/resena-list').get( async (req, res) => {
    await Resena.find((error, data) => {
        if(error){
            return next(error);
        }else{
            res.json(data);
        }
    });
});

//Agregar discusion
resenaRoute.route('/resena-create').post( async (req, res, next) => {
    console.log(req.body);
        Resena.create(req.body, (error, data) => {
            if (error) {
                return next(error);
            } else {
                console.log('Informacion cargada correctamente');
                console.log(data);
            }
        });
});

//Obtener discusion
resenaRoute.route('/resena-read/:id').get((req, res, next) => {
    Resena.findById(req.params.id, (error, data) => {
        if(error) {
            return next(error);
        }else{
            res.json(data);
        }
    }).populate('comentarios');
});

module.exports = resenaRoute;