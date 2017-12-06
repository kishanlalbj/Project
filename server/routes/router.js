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

module.exports = router;