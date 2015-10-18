var Charity = require('../models/charity');
//for login
var Volunteer = require('../models/volunteer');

exports.searchMatches = function(tag, callback){
	Charity.find({},function(err,results){
    console.log(results);
  })
	Charity.find({tags:{$in:[tag]}}, callback);
};

//routes for pages
exports.getCharity = function(username,callback){
	Charity.findOne({username: username},callback);
};

exports.saveCharity = function(info, callback){
	Charity.findOne({username: info.username},function(err,charity){
		if(err) console.log(err);
		if(!charity){
			Charity.create({
				name: info.name,
				username: info.username,
				password: info.password,
				about: info.about,
				email: info.email,
				link: info.link
			}, function(err, charityQ){
				var rawTags = info.tags.split(',');
				Charity.update({name:charityQ.name},
          {$pushAll: {tags:rawTags}},{upsert:true},
          function(err){
            if(err){
              console.log(err);
            }else{
              console.log("successfully added");
              
            }
          })
				console.log("successfully saved:" + charity);

				var rawNeeds = info.needs.split(',');
				Charity.update({name:charityQ.name},
          {$pushAll: {needs:rawNeeds}},{upsert:true},
          function(err){
            if(err){
              console.log(err);
            }else{
              console.log("successfully added");
              return callback(true);
            }
          })
				
			});
		}else{
			return callback(false);
		}
		
	})
	
};

exports.authenticate = function(info, callback){
	Charity.findOne({username: info.username},function(err, charity){
		if(err) console.log(err);
		if(charity != null){
			return callback(true,charity,"char");
		}
		if(charity == null){
			Volunteer.findOne({username:info.username},function(err, volunteer){
				if(err) console.log(err);
				if(volunteer != null){
					return callback(true,volunteer,"vol");
				}
				if(volunteer == null){
					return callback(false,null);
				}
			});
		}

	});
};