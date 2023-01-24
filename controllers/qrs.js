'use strict'
const { request } = require('express');
var validator = require('validator');
var Qrs = require('../models/qrs')

var controller = {
    test: function (req, res) {
        return res.status(200).send({
            message: "Método test de añadir comentario"
        })
    }
    ,

    add: function (req, res) {
        var params = req.body;
        try {
            var validate_type = !validator.isEmpty(params.type);
            var validate_title = !validator.isEmpty(params.title);
            var validate_project = !validator.isEmpty(params.project);
            var validate_description = !validator.isEmpty(params.description)
        } catch (err) {
            return res.status(200).send({
                message: 'Faltan datos por enviar'
            })
        }


        if (validate_type && validate_project && validate_title && validate_description) {
            var qrs = new Qrs()

            qrs.type = params.type;
            qrs.project = params.project;
            qrs.title = params.title;
            qrs.description = params.description;
            qrs.user = req.user.sub;
            qrs.status = 'Enviada al admin'
            qrs.feedBack = {
                comment: 'Mensaje enviado al administrador'
            }
            //Gaurdar rqs


            qrs.save((err, qrsStored) => {


                if (err) {
                    return res.status(500).send({
                        message: 'Error al guardar la solicitud'
                    })
                }

                if (!qrsStored) {
                    return res.status(200).send({
                        message: 'No se pudo crear la solicitud'
                    })
                }
                console.log("hey baby!!!")
                return res.status(200).send({
                    status: 'success',
                    qrs: qrsStored
                })
            })
        } else {
            return res.status(500).send({
                message: 'Los datos no son válidos'
            })
        }
    }
    ,
    update: function (req, res) {
        //Tomar el id del proyecto de URL

        var reqId = req.params.id;

        //Find por id del topic
        var params = req.body;
        //Recoger los datos que llegan de POST

        try {
            var validate_type = !validator.isEmpty(params.type);
            var validate_title = !validator.isEmpty(params.title);
            var validate_project = !validator.isEmpty(params.project);
            var validate_description = !validator.isEmpty(params.description)
        } catch (err) {
            return res.status(200).send({
                message: 'Faltan datos por enviar'
            })
        }

        if (validate_type && validate_project && validate_title && validate_description) {

            var update = {
                title: params.title,
                type: params.type,
                project: params.project,
                description: params.description,
                status:  params.feedBack !== 'Mensaje enviado al administrador' ? 'Feedback Administrador': params.status ,
                feedBack: {
                    comment: params.feedBack
                }
            }

            //Validar si en la creación del proyecto se debe incluir al usuario
            Qrs.findOneAndUpdate({ _id: reqId }, update, { new: true }, (err, qrsUpdate) => {


                console.log("update", update, req.user.sub)

                if (err) {
                    return res.status(500).send({
                        message: 'Error al actualizar qrs'
                    })
                }

                if (!qrsUpdate) {
                    return res.status(404).send({
                        message: 'No se pudo actualizar el qrs'
                    })
                }

                return res.status(200).send({
                    status: 'success',
                    qrs: qrsUpdate
                })
            })


        } else {
            return res.status(404).send({
                message: 'Error en los datos enviados'
            })
        }

    },
    updateStatus: function (req, res) {
        //Tomar el id del proyecto de URL

        var reqId = req.params.id;

        //Find por id del topic
        var params = req.body;
        //Recoger los datos que llegan de POST
console.log("params", params)
        try {
            var validate_type = !validator.isEmpty(params.type);
            var validate_title = !validator.isEmpty(params.title);
            var validate_project = !validator.isEmpty(params.project);
            var validate_description = !validator.isEmpty(params.description);
            var validate_status = !validator.isEmpty(params.status);
            var validate_feedback = !validator.isEmpty(params.feedBack);
        } catch (err) {
            return res.status(200).send({
                message: 'Faltan datos por enviar'
            })
        }

        if (validate_type && validate_project && validate_title && validate_description && validate_status
            && validate_feedback) {


            console.log("params---->", params)
            var update = {
                title: params.title,
                type: params.type,
                project: params.project,
                description: params.description,
                status: params.status,
                feedBack: {
                    comment: params.feedBack
                }
            }

            //Validar si en la creación del proyecto se debe incluir al usuario
            Qrs.findOneAndUpdate({ _id: reqId }, update, { new: true }, (err, qrsUpdate) => {


                console.log("update", update, req.user.sub)

                if (err) {
                    return res.status(500).send({
                        message: 'Error al actualizar qrs'
                    })
                }

                if (!qrsUpdate) {
                    return res.status(404).send({
                        message: 'No se pudo actualizar el qrs'
                    })
                }

                return res.status(200).send({
                    status: 'success',
                    qrs: qrsUpdate
                })
            })


        } else {
            return res.status(404).send({
                message: 'Error en los datos enviados'
            })
        }

    },
    delete: function (req, res) {
        //Tomar el id del proyecto de URL

        var reqId = req.params.id;

        Qrs.findOneAndDelete({ _id: reqId }, (err, qrsRemoved) => {
            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error en la petición'
                })
            }

            if (!qrsRemoved) {
                return res.status(404).send({
                    status: 'error',
                    message: 'El proyecto no se ha eliminado'
                })
            }

            return res.status(200).send({
                status: 'success',
                qrsRemoved
            })
        })
    },
    obtain: function (req, res) {


        //Cargar la libreria de la paginación en la clase

        //Recoger la página actual

        if (!req.params.page || req.params.page == null || req.params.page == undefined || req.params.page == 0 || req.params.page == '0') {
            var page = 1
        } else {
            var page = parseInt(req.params.page);
        }

        var options = {
            sort: { date: -1 },
            populate: 'user',
            limit: 10,
            page: page
        }
        //Indicar las opciones de paginación


        //Find paginado

        Qrs.paginate({}, options, (err, qrs) => {

            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al hacer la consulta'
                })
            }
            if (!qrs) {
                return res.status(404).send({
                    status: 'notfound',
                    message: 'No hay solicitudes'
                })
            }
            return res.status(200).send({
                status: 'success',
                qrs: qrs.docs,
                totalDocs: qrs.totalDocs,
                totalPages: qrs.totalPages,
            })

        })


    }
}
module.exports = controller