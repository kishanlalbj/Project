var router = require('express').Router();
var movie = require('./schema');


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

router.get('/movies',function(req,res) {
	movie.find({},function(err,movies) {
		if(movies) {
			console.log(movies);
		} 
		res.send(movies);
	})
})

module.exports = router;