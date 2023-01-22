'use strict'


var validator = require('validator');
var Project = require('../models/project');

var controller ={
    
probando: function(req, res){
    return res.status(200).send({
        message: 'Soy el método probando de project'
    })
},
save: function(req, res){
    //Tomar params
    var params = req.body;


    console.log("params--->", params)
    //Validar

    try{
        var validate_title =  !validator.isEmpty(params.title);
        var validate_description = !validator.isEmpty(params.description);
        var validate_department = !validator.isEmpty(params.department);
        var validate_tecnology = !validator.isEmpty(params.tecnology);
    }catch(err){
        return res.status(200).send({
            message: 'Faltan datos por enviar'
        })
    }
    
    if(validate_title && validate_department && validate_description && validate_tecnology){
        var project = new Project()

            project.title = params.title;
            project.description = params.description;
            project.department = params.department;
            project.tecnology = params.tecnology;
            //Gaurdar request


            project.save((err, reqStored)=>{


                if(err){
                    return res.status(500).send({
                        message: 'Error al guardar proyecto'
                    })  
                }

                if(!reqStored){
                    return res.status(200).send({
                        message: 'No se pudo crear el proyecto'
                    })
                }

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
update: function(req, res){

    //Tomar el id del proyecto de URL

    var reqId = req.params.id;

     //Find por id del topic
     var params = req.body;
     //Recoger los datos que llegan de POST

     try{
        var validate_title =  !validator.isEmpty(params.title);
        var validate_description = !validator.isEmpty(params.description);
        var validate_department = !validator.isEmpty(params.department);
        var validate_tecnology = !validator.isEmpty(params.tecnology);
    }catch(err){
        return res.status(200).send({
            message: 'Faltan datos por enviar'
        })
    }
    
    if(validate_title && validate_department && validate_description && validate_tecnology){

        var update = {
            title : params.title,
            description : params.description,
            department : params.department,
            tecnology: params.tecnology
        }

            //Validar si en la creación del proyecto se debe incluir al usuario
        Project.findOneAndUpdate({ _id : reqId }, update, {new: true},(err, projectUpdate)=>{


            console.log("update", update, req.user.sub)

            if(err){
                return res.status(500).send({
                    message: 'Error al actualizar proyecto'
                })  
            }

            if(!projectUpdate){
                return res.status(404).send({
                    message: 'No se pudo actualizar el proyecto'
                })
            }

            return res.status(200).send({
                status: 'success',
                request: projectUpdate
            })
        })


    }else{
        return res.status(404).send({
            message: 'Error en los datos enviados'
        })
    }
    

},
delete : function(req, res){
     //Tomar el id del proyecto de URL

     var reqId = req.params.id;

     Project.findOneAndDelete({ _id : reqId}, (err, projectRemoved)=>{
        if(err){
            return res.status(500).send({
                status: 'error',
                message: 'Error en la petición'
            })
        }
        
        if(!projectRemoved){
            return res.status(404).send({
                status: 'error',
                message: 'El proyecto no se ha eliminado'
            })
        }
        
        return res.status(200).send({
            status: 'success',
            projectRemoved
        })
    })
},
obtain: function(req, res){

    

        //Cargar la libreria de la paginación en la clase

        //Recoger la página actual
     


        if(!req.params.page ||req.params.page == null || req.params.page == undefined ||req.params.page == 0 ||req.params.page == '0'){
            var page = 1
        }else{
            var page = parseInt(req.params.page);
        }

        var options = {
            sort: { date: -1},
            populate: 'request',
            limit: 10,
            page: page
        }
        //Indicar las opciones de paginación


        //Find paginado

        Project.paginate({}, options, (err, projects)=>{

                if(err){
                    return res.status(500).send({
                        status: 'error',
                        message: 'Error al hacer la consulta'
                    })
                }
                if(!projects){
                    return res.status(404).send({
                        status: 'notfound',
                        message: 'No hay solicitudes'
                    }) 
                }
            return res.status(200).send({
                status: 'success',
                project: projects.docs,
                totalDocs: projects.totalDocs,
                totalPages: projects.totalPages,
            })

        })


}

}



module.exports = controller;