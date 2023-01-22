'use strict'


var express = require('express');
var QrsController = require('../controllers/qrs');
var md_auth = require('../middleware/authenticated');

var router = express.Router();

router.post('/add',md_auth.authenticated, QrsController.add);
router.put('/update/:id',md_auth.authenticated, QrsController.update);
router.put('/update/status/:id',md_auth.authenticated, QrsController.updateStatus);
router.delete('/delete/:id',md_auth.authenticated, QrsController.delete);
router.get('/list/',md_auth.authenticated, QrsController.obtain);
module.exports = router;
