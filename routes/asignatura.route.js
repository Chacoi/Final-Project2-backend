const express = require('express');
const app = express();
const asignaturaRoute = express.Router();
const asignaturas = require('../controllers/asignaturas')

const Asignatura = require('../models/Asignatura');

//Obtener todas las asignaturas
asignaturaRoute.route('/asignatura-list').get(asignaturas.list);

//Obtener asignatura
asignaturaRoute.route('/asignatura-read/:id').get(asignaturas.get);

//Agregar asignatura
asignaturaRoute.route('/asignatura-create').post(asignaturas.create);

//Actualizar asignatura
asignaturaRoute.route('/asignatura-update/:id').put(asignaturas.update);

//Delete asignatura
asignaturaRoute.route('/asignatura-delete/:id').delete(asignaturas.delete);

module.exports = asignaturaRoute;