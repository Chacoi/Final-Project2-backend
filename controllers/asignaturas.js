const Asignatura = require('../models/Asignatura');

module.exports.list = async (req, res) => {
    console.log("Obtener todas las asignaturas");
    await Asignatura.find((error, data) => {
        if(error){
            return next(error);
        }else{
            res.json(data);
        }
    });
}

module.exports.get = (req, res, next) => {
    console.log("obtener discusion")
    Asignatura.findById(req.params.id, (error, data) => {
        if(error) {
            return next(error);
        }else{
            res.json(data);
        }
    }).populate('comentarios');
}

module.exports.create = async (req, res, next) => {
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
}

module.exports.update = (req, res, next) => {
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
}

module.exports.delete = (req, res, next) => {
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
}