// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require('./models');

// var new_campsite = {description: "Sharp rocks. Middle of nowhere."}

// db.Campsite.create(new_campsite, function(err, campsite){
//   if (err){
//     return console.log("Error:", err);
//   }

//   console.log("Created new campsite", campsite._id)
//   process.exit(); // we're all done! Exit the program.
// })
db.Profile.create(new_profile,function(err,profile){
	if(err){
		return console.log("error:", err);
	}
	console.log("Created new profile", profile._id);
	process.exit();
});

db.Wish.create(new_wish,function(err,wish){
	if(err) {
		return console.log("eror:",err);
	}
	console.log("created new wish",wish._id);
	process.exit();
});

