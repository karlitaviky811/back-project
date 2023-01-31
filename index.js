'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3999;

mongoose.set('useFindAndModify', false)
mongoose.Promise = global.Promise;
const mongoAtlasUri =
"mongodb+srv://admin:admin@cluster0.lk8k50s.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(mongoAtlasUri,
    { useNewUrlParser: true, useUnifiedTopology: true },)
        .then(()=>{
            console.log("La conexión a la base de datos de mongo se ha realizado correctamente", port)
            //Crear el servidor

            app.listen(port, ()=>{
                console.log("El servidor está funcionando")
            })
        })
        .catch(error=> console.log(error))

        mongoose.set('useFindAndModify', false)
        mongoose.Promise = global.Promise;


