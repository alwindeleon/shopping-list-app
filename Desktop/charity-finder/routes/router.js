var express = require('express');
var router = express.Router();
//get services
var charityServices = require('../services/charity');
var volunteerServices = require('../services/volunteer');

 router.get('/',function(req,res,next){
 	return res.render('landing-page',{logged:false});
 });

//ajax // api endpoints
 router.post('/charities',function(req, res, next){
 	console.log(req.body);
 	if(req.body == null) return res.json({error: "no match"});

 	console.log("TAG IS: " + req.body.tag);
 	charityServices.searchMatches(req.body.tag, function(err, results){
 		console.log(results);
 		if(err) console.log(err);
 		if(!results) return res.json({list: NULL});
 		return res.render("results-page",{list: results});
 	});
 });

//routes to pages
router.get('/profile/charity', function(req,res, next){
	charityServices.getCharity(req.body.name, function(err, charity){
		if(err) console.log(err);
		if(!charity) console.log("charity does not exist");
		return res.render("charityP",charity);
	});
});
router.get('/dashboard/charity/:username',function(req,res){
	charityServices.getCharity(req.params.username, function(err, charity){
			console.log(charity);
			if(err) console.log(err);
			if(!charity) console.log("charity does not exist");
			return res.render("charityDB",charity);
	});
});

router.get('/dashboard/volunteer/:username',function(req,res, next){
	volunteerServices.getVolunteer(req.params.username, function(err, volunteer){
			if(err) console.log(err);
			if(!volunteer) console.log("volunteer does not exist");
			volunteer.logged = true;
			return res.render("volunteerDB", volunteer);
	});
});

//ajax
router.post('/signup/volunteer',function(req,res,next){
	volunteerServices.saveVolunteer(req.body, function(status){
		console.log(req.body);
		if(status == true) return res.json({message: true});
			return res.json({message:"username already used"});
	});
});


//ajax
router.post('/signup/charity',function(req,res,next){
	charityServices.saveCharity(req.body, function(status){
		if(status == true) return res.json({message: "true"});
		return res.json({message:"username already used"});
	});
});

//ajax
router.post('/login',function(req,res,next){
	charityServices.authenticate(req.body, function(status, user,charOrVol){
		if(status){
			return res.json({message:true, item: user, kind: charOrVol});
		}else{
			return res.json({message:false});
		}
	});
});



module.exports = router;