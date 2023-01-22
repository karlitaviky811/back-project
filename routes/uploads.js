'use strict'

var express = require('express');
const { check }  = require('express-validator')
var cargarArchivo = require('../controllers/uploads');
var { subirArchivo } = require('../helpers')
var router = express.Router();

router.post('/', cargarArchivo.actualizarImagenCloudinary)
router.put('/:coleccion/:id', [
    check('id','El id debe de ser de mongo').isMongoId(),
    check('coleccion').custom( c => subirArchivo.test( c, ['user','request'] ) ) ] ,cargarArchivo.actualizarImagen )

module.exports = router;