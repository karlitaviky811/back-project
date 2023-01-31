'use strict'
var mongoose = require('mongoose');
var app = require('./app');

var port = process.env.PORT || 3999;
require('dotenv').config();
mongoose.Promise = global.Promise;
require('dotenv').config();
console.log("here", process.env.MONGODB_URI)

mongoose.connect(process.env.MONGODB_URI, {
  auth: { username: "admin", password: "admin" },
  dbName: "test",
  useNewUrlParser: true,
}, function(err, db) {
  if (err) {
    console.log('mongoose error', err);
  }else{
    console.log("connected", process.env.PORT)
    app.listen(port, ()=>{
      console.log("El servidor está funcionando", port)
  })
  }
});