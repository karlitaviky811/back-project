'use strict'

//Requires
var express = require('express');
var bodyParser = require('body-parser');

//Ejecutar express
var app = express();

//Cargar archivos de rutas
var user_routes = require('./routes/user');
var request_routes = require('./routes/req');
var project_routes = require('./routes/project');
var qrs_routes = require('./routes/qrs');
//Middlewares
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//CORS
var cors = require('cors')
app.use(cors());


//Rutas o reescribir rutas
app.use('/api', user_routes);
app.use('/api/req', request_routes);
app.use('/api/project', project_routes);
app.use('/api/qrs', qrs_routes);
//Exportar módulos
module.exports = app;