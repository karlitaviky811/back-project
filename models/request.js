'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongoosePaginate = require('mongoose-paginate-v2');

var RequestSchema = Schema({
    type: String,
    project: String,
    title: String,
    priority: String,
    urgency: String,
    description: String,
    date: {type: Date, default: Date.now},
    feedBack: {
        fecha: {type: Date, default: Date.now},
        comment: String
    },
    user: {type: Schema.ObjectId, ref:'User'},
    status: String                                                                                             
});

// Cargar paginación
RequestSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Request',RequestSchema)