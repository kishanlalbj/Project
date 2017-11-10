var router = require('express').Router();
var movie = require('./schema');


var kk = new movie({
	name:'Kakka Kakka',
	lead_actor:'Surya'
})

router.get('/',function(req,res) {
	res.send("API Worked..!!!");
	kk.save(function(err) {
		if (err) throw err;	  
		console.log('MOVIE saved successfully!');
	  });

})

router.get('/movies',function(req,res) {
	movie.find({},function(err,movies) {
		res.send(movies);
	})
})

module.exports = router;