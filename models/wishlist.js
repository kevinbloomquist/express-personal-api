var mongoose = require('mongoose'),
Schema = mongoose.Schema;


 var WishSchema = new Schema({
 	title: String, 
 	details: String, 
 });


var Wish = mongoose.model('Wish', WishSchema);


module.exports = Wish;