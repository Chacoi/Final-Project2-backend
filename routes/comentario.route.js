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

comentarioRoute.route('/comentario-count/:id').get(comentarios.rateCountExterno);

//Comentarios según Dicusión
comentarioRoute.route('/comentario-read/:id').get(comentarios.list);

comentarioRoute.route('/comentario-read/:id').get(comentarios.listExterno);

module.exports = comentarioRoute;