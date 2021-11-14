const User = require('../models/Usuario');
const Interes = require('../models/Interes');
const Discusion = require('../models/Discusion');

module.exports.list = async (req, res, next) => {
    console.log("Obtener todos los usuarios");
    await User.find((error, data) => {
        if(error){
            return next(error);
        }else{
            res.json(data);
        }
    });
}

module.exports.delete = (req, res, next) => {
    console.log("borrar usuario")
    User.findOneAndDelete({_id: req.params.id}, (error, data) => {
        if(error){
            return next(error);
        }else{
            console.log(data);
            console.log(req.params.id);
            console.log("usuario eliminado correctamente");
            res.status(200).json({
                msg: data
            })
        }
    })
}

module.exports.register = async (req, res, next) => {
    const { password, username, email, image } = req.body;
    const permisos = 'estudiante';
    const user = new User({ username, email, permisos, image, score: 0 });
    console.log(req.body);
    registeredUser = await User.register(user, password);
    req.logIn(registeredUser, err => {
        if(err) return next(err);
        console.log("Inicio de sesión correcto");
        res.json(user);
        next();
    })
}

module.exports.logout = (req, res) => {
    console.log("cerrar sesión");
    req.logout();
    res.end();
}

module.exports.login = async (req, res, next) => {
    res.end();
}

module.exports.active = (req, res, next) => {
    if(req.user){
        User.findOne({username: req.user.username}, (error, data) => {
            if(error) {
                return next(error);
            }else{
                console.log(data);
                res.json(data);
            }
        }).populate('intereses');
    }else{
        res.end()
    }
   
}

module.exports.addInteres = async (req, res, next) => {
    const usuario = await User.findById(req.user._id);
    console.log(usuario);
        if(usuario){
            Interes.create(req.body, (error, data) => {
                if (error) {
                    return next(error);
                } else {
                    console.log(data);
                    usuario.intereses.push(data);
                    usuario.save();
                    console.log('Informacion cargada correctamente');
                    res.json(data);
                }
            })
        }else{
            console.log("Discusion no encontrada");
        }
}

module.exports.delInteres = (req, res, next) => {
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

module.exports.getInteres =  async (req, res) => {
    const id = req.user._id
    Discusion.findById(id, (error, data) => {
        if(error) {
            return next(error);
        }else{
            res.json(data);
        }
    }).populate('intereses');
}

module.exports.permissions = async (req, res) => {
    User.findByIdAndUpdate(req.params.id, {
        permisos: req.body.rol
    }, (error, data) => {
        if(error){
            return next(error)
        }else{
            res.end();
        }
    });
}

