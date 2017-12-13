var router = require('express').Router();
var movie = require('./schema');
var multer = require('multer');
var upload = multer({ dest: 'uploads/' })
var fs = require('fs');

var storage = multer.diskStorage({ //multers disk storage settings
	destination: function (req, file, cb) {
		cb(null, './uploads/');
	},
	filename: function (req, file, cb) {
		var datetimestamp = Date.now();
		cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
	}
});


var users = [ 
    {
    id:1,
    admin:false,
    username:"guest",
    password:"guest"

},
{
    id:2,
    admin:true,
    username:"admin",
    password:"admin"
}
]

var upload = multer({ //multer settings
				storage: storage
			}).single('file');


			router.post('/file',function(req,res) {
				console.log("top",req.file);
				upload(req,res,function(err){
					console.log(req.file);
					if(err){
						 res.json({error_code:1,err_desc:err});
						 return;
					}
					 res.json({error_code:0,err_desc:null});
				});
			});
			








var kk = new movie({
	name:'Sherlock Holmes',
	lead_actor:'Tony Stark'
})

router.get('/',function(req,res) {
	res.send("API Worked..!!!");
	kk.save(function(succ,err) {
		if(succ) {
			console.log("Movie saved");
		} else if(err) {
			console.log(err);
		}
 	  });
})


router.post('/post',function(req,res) {
	console.log(typeof req.body);	
	res.send("movies");
});


router.get('/movies',function(req,res) {
	movie.find({},function(err,movies) {
		if(movies) {
			console.log(movies);
		} 
		res.send(movies);
	})
})



router.post('/login',function(req,res) {
	if(req.body.name && req.body.password) {
		var name = req.body.name;
		var password = req.body.password;
	}

	var user = users[_.findIndex(users, {name: name})];
	if( ! user ){
	  res.status(401).json({message:"no such user found"});
	}
	if(user.password === req.body.password) {
		// from now on we'll identify the user by the id and the id is the only personalized value that goes into our token
		var payload = {id: user.id};
		var token = jwt.sign(payload, jwtOptions.secretOrKey);
		res.json({message: "ok", token: token});
	  } else {
		res.status(401).json({message:"passwords did not match"});
	  }
})

module.exports = router;