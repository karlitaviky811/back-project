var validator = require('validator');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { subirArchivo, coleccionesPermitidas } = require('../helpers');
var Request = require('../models/request')
const User = require('../models/user');
const { collection } = require('../models/user');
const { check }  = require('express-validator')
var mongoose = require('mongoose');
// Require the Cloudinary library
const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL)
var controller ={

    probandos: async function(req, res){
        console.log(req.files);
        return res.status(200).send({
            message: 'Soy el método probando'
        })
    },
    probando: async function(req, res) {
 
      
        if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
          return res.status(400).json({msg:'No files were uploaded.'});
        }

   //   const pathCompleto = await  subirArchivo( req.files );
try{
    const nombre = await subirArchivo( req.files , undefined , 'imgs')
     res.json({
         nombre
     })
}catch(err){
    console.log(err)
    res.status(400).json({error: err})
}
   //const nombre = await subirArchivo( req.files , ['text', 'md'])
     /* res.json({
          path: pathCompleto
      })
   */
    
        
    },
    
 actualizarImagen: async function(req, res = response ){

    const { id, coleccion } = req.params;
    let modelo;
    var isValid = mongoose.Types.ObjectId.isValid(id);
    if( isValid && coleccionesPermitidas( coleccion, ['user','request'] ) ){
    switch ( coleccion ) {
        case 'user':
            modelo = await User.findById(id);
            if ( !modelo ) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${ id }`
                });
            }
        
        break;

        case 'request':
            modelo = await Request.findById(id);
            if ( !modelo ) {
                return res.status(400).json({
                    msg: `No existe un producto con el id ${ id }`
                });
            }
        
        break;
    
        default:
            return res.status(500).json({ msg: 'Se me olvidó validar esto'});




        }
    }

    console.log("hereeee", modelo)

    console.log("modelo", modelo)
    // Limpiar imágenes previas
    if ( modelo.image ) {
        // Hay que borrar la imagen del servidor
        const pathImagen = path.join( __dirname, '../uploads', coleccion, modelo.image );
        if ( fs.existsSync( pathImagen ) ) {
            fs.unlinkSync( pathImagen );
        }
    }


    const nombre = await subirArchivo( req.files, undefined, coleccion );
    console.log("nombre", nombre)
    modelo.image = nombre;

   await modelo.save();


    res.json( modelo );

},


 actualizarImagenCloudinary : async function(req, res = response ){

    const { id, coleccion } = req.params;
    let modelo;
    var isValid = mongoose.Types.ObjectId.isValid(id);
    if( isValid && coleccionesPermitidas( coleccion, ['user','request'] ) ){
    switch ( coleccion ) {
        case 'user':
            modelo = await User.findById(id);
            if ( !modelo ) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${ id }`
                });
            }
        
        break;

        case 'request':
            modelo = await Request.findById(id);
            if ( !modelo ) {
                return res.status(400).json({
                    msg: `No existe un producto con el id ${ id }`
                });
            }
        
        break;
    
        default:
            return res.status(500).json({ msg: 'Se me olvidó validar esto'});
        }
    }

    console.log("modelo", req)
    // Limpiar imágenes previas
  
     // const { tempFilePath } = req.files.archivo
      //const resp = await  cloudinary.uploader.upload( tempFilePath )
    


    //const nombre = await subirArchivo( req.files, undefined, coleccion );
    //console.log("nombre", nombre)
    //modelo.image = nombre;

   //await modelo.save();


    res.json( modelo );


},

mostrarImagen : async function(req, res = response ){

    const { id, coleccion } = req.params;

    let modelo;

    switch ( coleccion ) {
        case 'user':
            modelo = await User.findById(id);
            if ( !modelo ) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${ id }`
                });
            }
        
        break;

        case 'request':
            modelo = await Request.findById(id);
            if ( !modelo ) {
                return res.status(400).json({
                    msg: `No existe un producto con el id ${ id }`
                });
            }
        
        break;
        default:
            return res.status(500).json({ msg: 'Se me olvidó validar esto'});
    }


    // Limpiar imágenes previas
    if ( modelo.img ) {
        // Hay que borrar la imagen del servidor
        const pathImagen = path.join( __dirname, '../uploads', coleccion, modelo.img );
        if ( fs.existsSync( pathImagen ) ) {
            return res.sendFile( pathImagen )
        }
    }

    const pathImagen = path.join( __dirname, '../assets/no-image.jpg');
    res.sendFile( pathImagen );
}



}


module.exports = controller;