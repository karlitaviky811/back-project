'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongoosePaginate = require('mongoose-paginate-v2');



var ProjectSchema = Schema({
    date: {type: Date, default: Date.now},
    title: String,
    description: String,
    department: String,
    tecnology: String                                                                                        
});

// Cargar paginación
ProjectSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Project',ProjectSchema)