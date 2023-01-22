'use strict'

//Requires
var express = require('express');
var bodyParser = require('body-parser');
const fileUpload = require('express-fileUpload');

//Ejecutar express
var app = express();

//Cargar archivos de rutas
var user_routes = require('./routes/user');
var request_routes = require('./routes/req');
var project_routes = require('./routes/project');
var qrs_routes = require('./routes/qrs');
var files_routes = require('./routes/uploads');
//Middlewares
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
// Note that this option available for versions 1.0.0 and newer. 
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/',
    createParentPath: true
}));

//CORS
var cors = require('cors')
app.use(cors());


//Rutas o reescribir rutas
app.use('/api', user_routes);
app.use('/api/req', request_routes);
app.use('/api/project', project_routes);
app.use('/api/qrs', qrs_routes);
app.use('/api/files', files_routes);
//Exportar módulos
module.exports = app;