//Comentario model
const Comentario = require('../models/Comentario');

//Discusion model
const Discusion = require('../models/Discusion');

//Asignatura model
const Asignatura = require('../models/Asignatura');


module.exports.add = async (req, res, next) => {
    
    const ubicacion = req.params.ubi;
    console.log(ubicacion);
    const autor = req.user.username;
    if(ubicacion=='discusion'){
        const discusion = await Discusion.findById(req.params.id);
        comentario = new Comentario({
            idAutor: req.user._id,
            autor: autor,
            comentario: req.body.comentario,
            fecha: new Date()
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
    }
    if(ubicacion=='resena'){
        const asignatura = await Asignatura.findById(req.params.id);
        let puntuacion = req.body.rating;
        if(!req.body.rating){
            puntuacion = 0;
            console.log("el formulario está malo " + req.body.rating)
        }
        comentario = new Comentario({
            idAutor: req.user._id,
            autor: autor,
            comentario: req.body.comentario,
            rate: puntuacion,
            fecha: new Date()
        });
            if(asignatura){
                Comentario.create(comentario, (error, data) => {
                    if (error) {
                        return next(error);
                    } else {
                        console.log(data);
                        asignatura.comentarios.push(data);
                        asignatura.save();
                        console.log('Informacion cargada correctamente');
                        res.json(data);
                    }
                })
            }else{
                console.log("Discusion no encontrada");
            }
    }
}

module.exports.delete = (req, res, next) => {
    Comentario.findOneAndDelete(req.params.id, (error, data) => {
        if(error){
            return next(error);
        }else{
            res.status(200).json({
                msg: data
            })
        }
    })
}
module.exports.rate = (req, res, next) => {
    console.log("Valorar discusion");
    let idComentario = req.params.id;
    let valoracion = req.body.valoracion;
    let flag = false;
    Comentario.findById(idComentario, (error, data) => {
        if(error) {
            return next(error);
        }else{
            if(!valoracion){
            data.valoracionMal.forEach(element => {
                if(element==req.user._id){
                    res.end();
                }
            });
            data.valoracionMal.push(req.user._id);
            console.log(data);
            data.save();
            res.json(data);
            }
            if(valoracion){
                data.valoracionBien.forEach(element => {
                    if(element==req.user._id){
                        flag= true;
                    }
                });
                if(!flag){
                    data.valoracionBien.push(req.user._id);
                    data.save();
                    console.log(data);
                    res.json(data);
                }else{
                    res.end();
                }
            }
        }
    })
}
module.exports.rateCount = async (req, res, next) => {
    idUsuario = req.user._id;
    let cont = 0;
    await Comentario.find({ idAutor: idUsuario, valoracionBien: {$exists: true, $not: {$size: 0}} }, (error, data) => {
        if(error){
            console.log("Discusion no encontrada")
            return next(error);
        }else{
            data.forEach( element => {
                cont = element.valoracionBien.length + cont;
                console.log(element);
            })
            console.log(cont);
            res.json(cont);
        }
    });
}
module.exports.list =  async (req, res) => {
    console.log("Obtener todas las discusiones");
    await Comentario.find({idAutor: req.user._id},(error, data) => {
        if(error){
            return next(error);
        }else{
            res.json(data);
        }
    });
}