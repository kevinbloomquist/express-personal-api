var mongoose = require('mongoose'),
Schema = mongoose.Schema;


 var PetsSchema = new Schema({
 	name: String, 
 	type: String, 
 	breed: String
 });

 var ProfileSchema = new Schema({
 	name:String,
 	github_link:String,
 	github_profile_image:String,
 	current_city:String,
 	pets:[PetsSchema]	
 });

 
var Profile = mongoose.model('Profile', ProfileSchema);

module.exports = Profile;