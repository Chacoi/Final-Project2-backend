
const express = require('express');
const interesRoute = express.Router();
const interes = require('../controllers/interes');

//Eliminar interés de la BD
interesRoute.route('/interes-delete/:id').delete(interes.delete);

//Eliminar interés de usuario
interesRoute.route('/interes-delete-fromUser/:id').delete(interes.deleteFromUser);



// //Obtener intereses
// interesRoute.route('/*').get(interes.get);

//Obtener todos los intereses
interesRoute.route('/intereses').get(interes.getIntereses);

//Agregar interés a la lista
interesRoute.route('/interes-create').post(interes.create);

//Editar interés
interesRoute.route('/interes-edit/:id').put(interes.update);


module.exports = interesRoute;