const express = require('express');
const app = express();
const discusionRoute = express.Router();
const isLoggedIn = require('../middleware');
const discusiones = require('../controllers/discusiones');


//Discusion model
const Discusion = require('../models/Discusion');

//Obtener todas las discusione
discusionRoute.route('/discusion-list').get( discusiones.list);

//Obtener discusiones según usuario activo
discusionRoute.route('/discusion-user-list').get(discusiones.listByUser);

//Obtener discusiones según interés
discusionRoute.route('/discusion-list/:tag').get(discusiones.listByTag);

//Agregar discusion
discusionRoute.route('/discusion-create').post(discusiones.create);

//Obtener discusion
discusionRoute.route('/discusion-read/:id').get(discusiones.get);

//Actualizar discusion
discusionRoute.route('/discusion-update/:id').put(discusiones.update);

//Delete discusion
discusionRoute.route('/discusion-delete/:id').delete(discusiones.delete);

//Valorar discusion
discusionRoute.route('/discusion-valorar/:id').put(discusiones.rate);

//Cuantificar valoraciones
discusionRoute.route('/discusion-count').get(discusiones.rateCount)

module.exports = discusionRoute;