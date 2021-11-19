const Interes = require('../models/Interes');
const User = require('../models/Usuario');
//Eliminar interes
module.exports.deleteFromUser = (req, res, next) => {
    User.findById(req.user._id, (error, data) => {
        index = 0;
        data.intereses.forEach(element => {
            if(element._id == req.params.id){
                console.log(data.intereses);
                //element + ' ' + req.params.id + ' ' + index
                data.intereses.splice(index, 1);
                data.save();
            }
            index++;
        });
    });
    res.end()
}

module.exports.delete = (req, res, next) => {
    Interes.findOneAndDelete({_id: req.params.id}, (error, data) => {
        if(error){
            return next(error);
        }else{
            res.status(200).json({
                msg: data
            })
        }
    })
}

// //Obtener intereses según discusión ***posiblemente de sobra***
// module.exports.get =  async (req, res) => {
//     const id = req.user._id
//     Discusion.findById(id, (error, data) => {
//         if(error) {
//             return next(error);
//         }else{
//             res.json(data);
//         }
//     }).populate('intereses');
// }

//Obtener todos los interes
module.exports.getIntereses = async (req, res) => {
    Interes.find((error, data) => {
        if(error){
            return next(error);
        }else{
            res.json(data);
        }
    })
}

//Agregar nuevo interés a la lista
module.exports.create = async (req, res, next) => {
    console.log(req.body);

    interes = new Interes(
        {   
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            imagen: req.body.imagen
        }
    );
        Interes.create(interes, (error, data) => {
            if (error) {
                return next(error);
            } else {
                console.log('Informacion cargada correctamente');
                res.json(data);
            }
        });
}

//Editar interés
module.exports.update = (req, res, next) => {
    console.log("actualizar interes")
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