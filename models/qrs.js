'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongoosePaginate = require('mongoose-paginate-v2');

var QrsSchema = Schema({
    type: String,
    project: String,
    title: String,
    description: String,
    status: String,
    date: {type: Date, default: Date.now},
    user: {type: Schema.ObjectId, ref:'User'}, 
      feedBack: {
        fecha: {type: Date, default: Date.now},
        comment: String
    },                                                                                     
});

// Cargar paginación
QrsSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Qrs',QrsSchema)