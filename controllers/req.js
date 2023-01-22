'use strict'

const { request } = require('express');
var validator = require('validator');
var Request = require('../models/request')

var controller = {
    test: function(req, res){
        return res.status(200).send({
            message: 'En el request'
        })
    },
    save: function(req, res){
            var params = req.body;
            console.log("params save req--->", params)

            try{
                var validate_type =  !validator.isEmpty(params.type);
                var validate_project = !validator.isEmpty(params.project);
                var validate_title = !validator.isEmpty(params.title);
                var validate_priority = !validator.isEmpty(params.priority);
                var validate_urgency = !validator.isEmpty(params.urgency)
                var validate_description = !validator.isEmpty(params.description)
            }catch(err){
                return res.status(200).send({
                    message: 'Faltan datos por enviar'
                })
            }
            
            console.log("params image",  params.image)
            if(validate_type && validate_project && validate_title && validate_priority && validate_description
                && validate_urgency){
                var request = new Request()

                    request.type = params.type;
                    request.project = params.project;
                    request.title = params.title;
                    request.priority = params.priority;
                    request.description = params.description;
                    request.status = 'Created';
                    request.urgency = params.urgency;
                    request.user = req.user.sub;
                    request.image = params.image !== '' ? params.image : 'https://www.hazteveg.com/img/empty-photo.jpg';
                    request.feedBack = {
                        comment: params.feedBack}
                    //Gaurdar request

                    console.log("request user", request.user)
                console.log(request)

                    request.save((err, reqStored)=>{


                        if(err){
                            return res.status(500).send({
                                message: 'Error al guardar la solicitud'
                            })  
                        }

                        if(!reqStored){
                            return res.status(200).send({
                                message: 'No se pudo crear la solicitud'
                            })
                        }
                        console.log("hey baby!!!")
                        return res.status(200).send({
                            status: 'success',
                            request: reqStored
                        })
                    })
            }else{
                return res.status(500).send({
                    message: 'Los datos no son válidos'
                })
            }
    },
    getRequests: function(req, res){


        //Cargar la libreria de la paginación en la clase

        //Recoger la página actual
     


        if(!req.params.page ||req.params.page == null || req.params.page == undefined ||req.params.page == 0 ||req.params.page == '0'){
            var page = 1
        }else{
            var page = parseInt(req.params.page);
        }

        var options = {
            sort: { date: -1},
            populate: 'user',
            limit: 10,
            page: page
        }
        //Indicar las opciones de paginación


        //Find paginado

        Request.paginate({}, options, (err, requests)=>{

                if(err){
                    return res.status(500).send({
                        status: 'error',
                        message: 'Error al hacer la consulta'
                    })
                }
                if(!requests){
                    return res.status(404).send({
                        status: 'notfound',
                        message: 'No hay solicitudes'
                    }) 
                }
            return res.status(200).send({
                status: 'success',
                requests: requests.docs,
                totalDocs: requests.totalDocs,
                totalPages: requests.totalPages,
            })

        })

        
    },
    getRequestsUser: function(req, res){

        //Conseguir el id del usuario


        //Find condición usuario


        //Deevolver resultado
        var userId = req.params.user

        Request.find({
            user: userId
        })
        .sort([['date', 'descending']])
        .exec((err, requests)=>{

            if(err){
                return res.status(500).send({
                    message: 'Error en la petición'
                })
            }

            if(!requests){
                return res.status(500).send({
                    status: 'Error',
                    message: 'No hay solicitudes para mostrar'
                })
            }


            return res.status(200).send({
                status: 'success',
                requests
            })
        })

       

    },
    getRequest: function(req, res){

        //Sacar el id del topic  de la url
        var reqId = req.params.id;

        //Find por id del topic
        Request.findById(reqId)
               .populate('user')
               .exec((err, request)=>{

                    if(err){
                        return res.status(500).send({
                            message: 'Error en la petición'
                        })
                    }

                    if(!request){
                        return res.status(404).send({
                            message: 'No existe la solicitud'
                        })
                    }

                    return res.status(500).send({
                        message: 'success',
                        request
                    })

               })

    },
    updateRequest: function(req, res){

        //Obtener el idTopic
        var reqId = req.params.id;

        //Find por id del topic
        var params = req.body;
         //Recoger los datos que llegan de POST

        try{
            var validate_type =  !validator.isEmpty(params.type);
            var validate_project = !validator.isEmpty(params.project);
            var validate_title = !validator.isEmpty(params.title);
            var validate_priority = !validator.isEmpty(params.priority);
            var validate_urgency = !validator.isEmpty(params.urgency)
            var validate_description = !validator.isEmpty(params.description)

        }catch(err){
            return res.status(200).send({
                message: 'Faltan datos por enviar'
            })
        }
        
        
      
        if(validate_type && validate_project && validate_title && validate_priority 
            && validate_description && validate_urgency){
          console.log("params", params)
            var update = {
                type :  params.type,
                project : params.project,
                title : params.title,
                priority : params.priority,
                description : params.description,
                urgency: params.urgency,
                status: params.status,
                image : params.image,
                feedBack : {
                    comment: params.feedBack
                }
            }
            console.log("update", update)
            Request.findOneAndUpdate({ _id : reqId , user : req.user.sub }, update, {new: true}, (err, reqUpdate)=>{
                
                if(err){
                    return res.status(500).send({
                        status: 'error',
                        message: 'Error en la petición'
                    })
                }
                
                if(!reqUpdate){
                    return res.status(404).send({
                        status: 'error',
                        message: 'El request no se ha actualizado'
                    })
                }
                
                return res.status(200).send({
                    status: 'success',
                    reqUpdate
                })
            })
              
        }else{
            return res.status(200).send({
                message: 'La validación de los datos no es correcta'
            })
        }
        //Validar los datos que llegan de POST
        //Montar un JSON con los datos modificables
    },
    updateRequestFeedback: function(req, res){

        //Obtener el idTopic
        var reqId = req.params.id;

        //Find por id del topic
        var params = req.body;
         //Recoger los datos que llegan de POST

        try{
            var validate_type =  !validator.isEmpty(params.type);
            var validate_project = !validator.isEmpty(params.project);
            var validate_title = !validator.isEmpty(params.title);
            var validate_priority = !validator.isEmpty(params.priority);
            var validate_description = !validator.isEmpty(params.description);
            var validate_feedback = !validator.isEmpty(params.feedBack)
            var validate_status = !validator.isEmpty(params.status)
        }catch(err){

            console.log("hey",params, validate_feedback )
            return res.status(200).send({
                message: 'Faltan datos por enviar'
            })
        }
        

      
        if(validate_type && validate_project && validate_title && validate_priority && 
            validate_description && validate_feedback &&  validate_status){
          console.log("heeey", params)
       
            var update = {
                type : params.type,
                project : params.project,
                title : params.title,
                priority : params.priority,
                description : params.description,
                urgency: params.urgency,
                status: params.status,
                feedBack:{
                    comment: params.feedBack
                }
            }
            console.log("update --->", update)
            Request.findOneAndUpdate({ _id : reqId , user : req.user.sub }, update, {new: true}, (err, reqUpdate)=>{
                
                if(err){
                    return res.status(500).send({
                        status: 'error',
                        message: 'Error en la petición'
                    })
                }
                
                if(!reqUpdate){
                    return res.status(404).send({
                        status: 'error',
                        message: 'El request no se ha actualizado'
                    })
                }
                
                return res.status(200).send({
                    status: 'success',
                    reqUpdate
                })
            })
              
        }else{
            return res.status(200).send({
                message: 'La validación de los datos no es correcta'
            })
        }
        //Validar los datos que llegan de POST
        //Montar un JSON con los datos modificables
    },
    deleteRequest(req, res){

        //Extraer id de la ruta
        var reqId = req.params.id;

        Request.findOneAndDelete({ _id : reqId, user: req.user.sub}, (err, reqRemoved)=>{
            if(err){
                return res.status(500).send({
                    status: 'error',
                    message: 'Error en la petición'
                })
            }
            
            if(!reqRemoved){
                return res.status(404).send({
                    status: 'error',
                    message: 'El request no se ha eliminado'
                })
            }
            
            return res.status(200).send({
                status: 'success',
                reqRemoved
            })
        })

    }


}


module.exports = controller