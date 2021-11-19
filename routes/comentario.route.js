const express = require('express');
const app = express();
const comentarioRoute = express.Router();
const comentarios = require('../controllers/comentarios');

//Comentario model
const Comentario = require('../models/Comentario');

//Discusion model
const Discusion = require('../models/Discusion');

//Agregar comentario
comentarioRoute.route('/:id/comentario-create/:ubi').post(comentarios.add);

//Delete comentario
comentarioRoute.route('/comentario-delete/:id').delete(comentarios.delete);

//Valorar comentario
comentarioRoute.route('/comentario-valorar/:id').put(comentarios.rate);

//Contar valoraciones
comentarioRoute.route('/comentario-count').get(comentarios.rateCount);

//Comentarios según usuario activo
comentarioRoute.route('/comentario-user-list').get(comentarios.list);

module.exports = comentarioRoute;