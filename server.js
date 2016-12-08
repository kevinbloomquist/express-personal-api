// require express and other modules
var express = require('express'),
    app = express();

// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/************
 * DATABASE *
 ************/

var db = require('./models');

/**********
 * ROUTES *
 **********/

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 */

app.get('/api', function api_index(req, res) {
  // TODO: Document all your api endpoints below
  res.json({
     message: "Welcome to my personal api! Here's what you need to know...",
    documentation_url: "https://github.com/kevinbloomquist/express-personal-api/README.md",
    base_url: "http://still-river-94569.herokuapp.com",
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/profile", description: "Data about me"},
      {method: "POST", path: "/api/profile", description: "Posted profile"},  
      {method: "POST", path: "/api/wishList", description: "Some of my best friends"},
      {method: "GET", path: "/api/wishlist", description:"Displays full Wish list"},
      {method: "GET", path: "/api/wishlist/:id", description:"Displays a specific newWish"},
      {method: "PUT", path: "/api/wishList/:id", description: "Edits existing wish"},
      {method: "DELETE", path: "/api/wishList/:id", description: "Desetes a specific wish"},
    ]
  });
});

// return myProfile from profile endpont
app.get('/api/Profile', function servePro(req,res){
  db.Profile.find({},function(err,profile){
    if (err){return console.log("show error:"+err);}
    console.log(profile);
    res.json(profile);
  });
});
// Post a new profile to Profiles
app.post('/api/Profile', function postPro(req,res){
  var profile = new db.Profile({});
    profile.name = req.body.name;
    profile.github_link = req.body.github_link;
    profile.current_city =req.body.current_city;

    profile.save();
    res.json("Little p-profile"+ profile +"created!");

    if (err){return console.log("show error:"+err);}
    console.log(postObj);
    res.json(profile);

});
//*************wishlist
// screw seed data... make POST first and reate a database
app.post('/api/Wish', function postWish(req,res){
  var wish = new db.Wish({});
    wish.title = req.body.title;
    wish.description = req.body.description;

    wish.save();
    res.json("Little w-wish"+ wish +"created!");

    if (err){return console.log("show error:"+err);}
    console.log(wish);
    res.json(wish);

});

// Get wishlist
app.get('/api/Wish', function serveWish(req,res){
  db.Wish.find({},function(err,wish){
    if(err){return console.log("showerror:" +err);}
    console.log(wish);
    res.json(wish);
  });
});

// Get a wish from wishlist
app.get('/api/wish/:id', function oneWish(req,res){
db.Wish.findById(req.params.id,function(err,wish){
if(err){return console.log("showerror:" +err);
}
    console.log(wish);
    res.json(wish);
  });
});

// Edit a wish
app.put('/api/wish/:id',function editOne(req,res) {
db.Wish.findById(req.params.id,function(err,wish) {
if(err) {return console.log("show error:" + err);
}
wish.title = req.body.title;
wish.description = req.body.description;
wish.save();

console.log(wish);
res.json(wish);
});
});

app.delete ('api/wish/:id',function removeOne(req,res){
db.Wish.findById(req.params.id, function(err, wish) {
  if (err) {return console.log("show error:" + err);
}
wish.remove();
console.log(wish + "deleted!!!");
res.json(wish);
});
});
// Alternate approach************************
// app.get('/Wish/:id', function(req,res) {
// var index = req.params.id;
// for (i=0; i<db.wishes.length; i++){
//   if (wishes[i]._id==index){
//     res.json(wishes[i]);

//     }
//   }
// });
// endAlt approach******************************


/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
