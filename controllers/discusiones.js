//Discusion model
const Discusion = require('../models/Discusion');

module.exports.list = async (req, res) => {
    console.log("Obtener todas las discusiones");
    await Discusion.find((error, data) => {
        if(error){
            return next(error);
        }else{
            res.json(data);
        }
    });
}

module.exports.listByUser = async (req, res) => {
    console.log("Obtener todas las discusiones");
    await Discusion.find({idAutor: req.user._id},(error, data) => {
        if(error){
            return next(error);
        }else{
            res.json(data);
        }
    });
}

module.exports.listByUserExterno = async (req, res) => {
    console.log("Obtener todas las discusiones");
    await Discusion.find({idAutor: req.params.id},(error, data) => {
        if(error){
            return next(error);
        }else{
            res.json(data);
        }
    });
}

module.exports.listByTag =  async (req, res, next) => {
    console.log("obtener discusiones según interés");
    await Discusion.find({intereses: { $in: [req.params.tag]}}, (error, data) => {
        if(error){
            return next(error);
        }else{
            console.log(data)
            res.json(data);
        }
    });
}

module.exports.create = async (req, res, next) => {
    console.log(req.body.contenido);
    console.log(req.body.intereses);
    console.log(req.body.tipo);
    const tipoDiscusion = req.body.tipo;
    let imagenDiscusion = "../../../../assets/default.jpg";;
    if( tipoDiscusion == 'Positiva'){
        imagenDiscusion = "../../../../assets/feliz.png";
    } else if(tipoDiscusion == 'Neutral'){
        imagenDiscusion = "../../../../assets/neutral.png";
    }else if(tipoDiscusion == 'Negativa'){
        imagenDiscusion = "../../../../assets/triste.png";
    }
    discusion = new Discusion(
        {   
            idAutor: req.user._id,
            autor: req.user.username,
            titulo: req.body.contenido.titulo,
            contenido: req.body.contenido.contenido,
            intereses: req.body.intereses,
            image: imagenDiscusion,
            fecha: new Date()
        }
    );
        Discusion.create(discusion, (error, data) => {
            if (error) {
                
                return next(error);
            } else {
                console.log('Informacion cargada correctamente');
                console.log(discusion.fecha.getDay())
                console.log(data);
                res.json(data);
            }
        });
}

module.exports.get = (req, res, next) => {
    console.log("obtener discusion")
    Discusion.findById(req.params.id, (error, data) => {
        if(error) {
            return next(error);
        }else{
            res.json(data);
        }
    }).populate('comentarios');
}

module.exports.update = (req, res, next) => {
    console.log("actualizar discusion")
    Discusion.findByIdAndUpdate(req.params.id, {
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
    Discusion.findByIdAndDelete(req.params.id, (error, data) => {
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

module.exports.rate = (req, res, next) => {
    console.log("Valorar discusion");
    let idDiscusion = req.params.id;
    let valoracion = req.body.valoracion;
    let flag = false;
    Discusion.findById(idDiscusion, (error, data) => {
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
    await Discusion.find({idAutor: idUsuario}, (error, data) => {
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

module.exports.rateCountExterno = async (req, res, next) => {
    idUsuario = req.params.id;
    let cont = 0;
    await Discusion.find({idAutor: idUsuario}, (error, data) => {
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