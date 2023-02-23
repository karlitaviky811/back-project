'use strict'


var express = require('express');
var RequestController = require('../controllers/req');
var ChartController = require('../controllers/chart');
var md_auth = require('../middleware/authenticated');

var router = express.Router();

router.get('/test', RequestController.test);
router.post('/request',md_auth.authenticated, RequestController.save);
router.get('/requests/:page?',RequestController.getRequests);
router.get('/user-requests/:user',RequestController.getRequestsUser);
router.get('/request/:id',RequestController.getRequest);
router.get('/request/group/:id',RequestController.getRequestGroup);
router.put('/request/:id',md_auth.authenticated,RequestController.updateRequest);
router.put('/request/:id/feedback',md_auth.authenticated,RequestController.updateRequestFeedback);
router.delete('/request/:id',md_auth.authenticated,RequestController.deleteRequest);


router.get('/request/graph/monts',md_auth.authenticated, ChartController.obtain);
router.get('/request/graph/montsA',md_auth.authenticated, ChartController.obtainAcepted);
router.get('/request/graph/montsR',md_auth.authenticated, ChartController.obtainRejected);
router.get('/request/graph/montsAUser/:user',md_auth.authenticated, ChartController.obtainAceptedUser);
router.get('/request/graph/montsRUser/:user',md_auth.authenticated, ChartController.obtainRejectedUser);
router.get('/request/graph/status',md_auth.authenticated, ChartController.obtainReqStatus);
router.get('/request/graph/statusActuallyMC',md_auth.authenticated, ChartController.obtainReqStatusMonthActuallyC);
router.get('/request/graph/statusActuallyMR',md_auth.authenticated, ChartController.obtainReqStatusMonthActuallyR);
router.get('/request/graph/statusActuallyMA',md_auth.authenticated, ChartController.obtainReqStatusMonthActuallyA);
router.get('/request/graph/project/',md_auth.authenticated, ChartController.obtainReqProjectStatus);


router.get('/request/graph/project/qrsQR',md_auth.authenticated, ChartController.obtainReqProjectQRS);
router.get('/request/graph/project/qrsS',md_auth.authenticated, ChartController.obtainReqProjectQRSS);
router.get('/request/graph/project/qrsT',md_auth.authenticated, ChartController.obtainInfoQRS);


router.get('/request/graph/project/qrs-all',ChartController.obtainQRSAllUsers);
router.get('/request/graph/project/qrs-all/:id',ChartController.obtainQRSAllUser);


//User
router.get('/request/graph/monts/:id',md_auth.authenticated, ChartController.obtainUser);
router.get('/request/graph/status/:id',md_auth.authenticated, ChartController.obtainReqStatusUser);
router.get('/request/graph/statusActuallyMC/:id',md_auth.authenticated, ChartController.obtainReqStatusMonthActuallyCUser);
router.get('/request/graph/statusActuallyMR/:id',md_auth.authenticated, ChartController.obtainReqStatusMonthActuallyRUser);
router.get('/request/graph/statusActuallyMA/:id',md_auth.authenticated, ChartController.obtainReqStatusMonthActuallyAUser);
router.get('/request/graph/project/:id',md_auth.authenticated, ChartController.obtainReqProjectStatusUser);

router.get('/request/graph/project/qrsQR/:id',md_auth.authenticated, ChartController.obtainReqProjectQRSUser);
router.get('/request/graph/project/qrsS/:id',md_auth.authenticated, ChartController.obtainReqProjectQRSSUser);
router.get('/request/graph/project/qrsT/:id',md_auth.authenticated, ChartController.obtainInfoQRSUser);

//pROYECTOS con solicitudes aceptadas, rechazadas, en review


//Proyectos con solicitudes urgentes, normales


//Proyectos solicitudes y prioridades


//Indicador proyectos y solicitudes aceptadas lista
//SICE
//Entorno
//Faraute

//Proyectos con numero de quejas


//Proyectos con solicitudes urgentes


//Proyectos con solicitudes en revisión 

//Indicador proyectos solicitudes rechazas
//lista



//Indicador proyectos solicitudes in review




//Graficas de quejas, reclamos, sugerencias





//Graficas quejas proyectos, meses



//Graficas reclamos proyecto, meses




//Graficas sugerencias proyectos, meses



//Proyectos y solicitudes por tipo de usuario usuario indicadores


//qrs y solicitudes por tipo de usuario usuario indicadores

module.exports = router;


