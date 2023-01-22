'use strict'


var express = require('express');
var ProjectController = require('../controllers/project');
var md_auth = require('../middleware/authenticated');

var router = express.Router();

router.get('/test', ProjectController.probando);
router.get('/projects', ProjectController.obtain);
router.post('/save',md_auth.authenticated, ProjectController.save);
router.put('/update/:id',md_auth.authenticated, ProjectController.update);
router.delete('/delete/:id',md_auth.authenticated, ProjectController.delete);
router.get('/save',md_auth.authenticated, ProjectController.save);
module.exports = router;
