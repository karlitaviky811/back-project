'use strict'

var validator = require('validator');
var User = require('../models/user');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../services/jwt');
const { defaultConfiguration } = require('../app');
const user = require('../models/user');


var controller ={

probando: function(req, res){
    return res.status(200).send({
        message: 'Soy el método probando'
    })
},


testeando: function(req, res){
    return res.status(200).send({
        message: 'Soy el método TESTEANDO'
    })
},

save: function(req, res){
//Recoger los parametros de la peticion
var params = req.body;

//Validar los datos

try{
    var validate_name = !validator.isEmpty(params.name);
    var validate_surname = !validator.isEmpty(params.surname);
    var validate_email= !validator.isEmpty(params.email) && validator.isEmail(params.email);
    var validate_password = !validator.isEmpty(params.password);
    console.log("params", req.body)
}catch(err){
    return res.status(200).send({
        message: 'Faltan datos por enviar'
    })
}

if(validate_name && validate_surname && validate_password && validate_email){
    //Crear objeto de usuario
        var user = new User();

    //Asignar valores al usuario
        user.name = params.name;
        user.surname = params.surname;
        user.password = params.password;
        user.role = params.role;
        user.email = params.email.toLowerCase();
        console.log("params", params)
    //Comprobar si el usuario existe, 
        User.findOne({email: user.email}, (err, issetUser)=>{

            if(err){
                return res.status(500).send({
                    message: 'Error al comprobar duplicidad de usuario'
                })
            }
            

            if(!issetUser){
                //si no existe cifrar la contraseña
                bcrypt.hash(params.password, null, null, (err, hash)=>{
                    user.password = hash;
                })
               
                //guardar

                user.save((err, userStored)=>{

                    if(err){
                        return res.status(500).send({
                            message: 'Error al guardar usuario'
                        })
                    }

                    if(!userStored){
                        return res.status(400).send({
                            message: 'Error al guardar usuario'
                        })
                    }

                    //Devolver respuesta
                    return res.status(200).send({
                        message: 'El usuario se ha guardado con éxito',
                        user: userStored
                    })
    

                })
            }else{
                return res.status(500).send({
                    message: 'Usuario ya existe'
                })
            }

        })

}else{
    return res.status(500).send({
        message: 'Oops',
        params: params
    })
    
}


},

login: function(req, res){
    var params = req.body

    console.log("params", params)
    var validate_email = !validator.isEmpty(params.email);
    var validate_password = !validator.isEmpty(params.password);
    if(!validate_email || !validate_password){
        return res.status(500).send({
            message: 'Parametros incorrectos, envialos bien'
        })
    }
    var user = new User();
    user.email = params.email.toLowerCase();
    console.log("user.email", user.email)
    User.findOne({email: params.email.toLowerCase()}, (err, user)=>{
       
      if(err){
        return res.status(400).send({
            message: 'Error a intentar identificarse'
        })
      }

      if(!user){
        return res.status(500).send({
            message: 'El usuario no existe'
        })
      }

      console.log("ey", params.password, user.password)
      bcrypt.compare(params.password, user.password, (err, check)=>{

        if(err){
            return res.status(400).send({
                message: 'Error al validar'
            })
        }

        if(check){
            if(params.gettoken){
                return res.status(200).send({
                    token: jwt.createToken(user)
                })
            }else{

            user.password = undefined;  
            return res.status(200).send({
                status: "success",
                user
            })
        }
        }else{
            return res.status(500).send({
                message: 'El usuario no existe'
            })
        }
      })
        
    })


},

update: function(req, res){
    //Crear middleware para comprobar el jwt token, ponerselo a la ruta
        var params = req.body;
    //Recoger datos del usuario
    try{
        var validate_name = !validator.isEmpty(params.name);
        var validate_surname = !validator.isEmpty(params.surname);
        var validate_email= !validator.isEmpty(params.email) && validator.isEmail(params.email);
    
    }catch(err){
        return res.status(200).send({
            message: 'Faltan datos por enviar'
        })
    }
    

    //Eliminar propiedades innecesarias
    delete params.password;
    console.log("hey", req.user.sub)
    var userId = params._id;

    console.log("params", params, userId)
    //Buscar y actualizar documento

    //Comprobar si el email es unico

    if(req.user.email !== params.email){
          //Comprobar si el usuario existe, 
          User.findOne({email: params.email.toLowerCase()}, (err, issetUser)=>{

            if(err){
                return res.status(500).send({
                    message: 'Error al comprobar duplicidad de usuario'
                })
            }
            

            if(issetUser && issetUser.email == params.email){
                return res.status(200).send({
                    message: 'El email no puede ser modificado 1'
                })

            }else{
                User.findByIdAndUpdate({_id: userId}, params, {new: true}, (err, userUpdated) => {
    
                    if(err){
                        return res.status(500).send({
                            status: 'error',
                            message: 'Error al actualizar usuario'
                        })
                    }
            
                    if(!userUpdated){
                        return res.status(200).send({
                            status: 'success',
                            message: 'Error al actualizar usuario'
                        })
                    }
            
            
                    //Devolver respuesta
                    return res.status(200).send({
                       status: 'success',
                       user: userUpdated,
                       message: "Hey"
                    })
                }) 
            }

        })
    }else{
        User.findByIdAndUpdate({_id: userId}, params, {new: true}, (err, userUpdated) => {
    
            if(err){
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al actualizar usuario'
                })
            }
    
            if(!userUpdated){
                return res.status(200).send({
                    status: 'success',
                    message: 'Error al actualizar usuario'
                })
            }
    
    
            //Devolver respuesta
            return res.status(200).send({
               status: 'success',
               user: userUpdated,
               message: "Hey"
            })
        })
    }
    
   

   
},
getUsers: function(req, res){
    User.find().exec((err, users)=>{
        if(err || !users){
            return res.status(404).send({
                status: 'error',
                message: 'No hay usuarios que mostrar'
            })
        }

        return res.status(200).send({
            status: 'success',
            users: users
        })
    })

},
getUser: function(req, res){

    var userId = req.params.userId

    User.findById(userId).exec((err, user)=>{
        if(err || !user){
            return res.status(404).send({
                status: 'error',
                message: 'No existe el usuario'
            })
        }

        return res.status(200).send({
            status: 'success',
            user: user
        })
    })

}






}


module.exports = controller;