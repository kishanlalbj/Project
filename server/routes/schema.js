var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var movieSchema = new Schema({

    name:{ type:String, required:true },
    lead_actor:{type:String, required:true },
    createdOn: { type: Date,default:Date.now},
	updatedOn: { type: Date,default:Date.now},
	createdBy:{type:String,default:"user"},
	updatedBy:{type:String,default:"user"}
})

var movies = mongoose.model('movies',movieSchema,'movies');
module.exports = movies;