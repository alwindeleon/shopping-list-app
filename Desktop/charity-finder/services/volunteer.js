var Volunteer = require('../models/volunteer');



exports.getVolunteer= function(username,callback,errback){
  Volunteer.findOne({username: username},callback);
};

exports.saveVolunteer= function(info, callback, errback){
   var rawInterests = info.interests.split(',');
  Volunteer.findOne({username: info.username},function(err,volunteer){
    if(err) console.log(err);
    
    if(!volunteer){
      Volunteer.create({
        name: info.name,
        username: info.username,
        password: info.password,
        email: info.email,

      }, function(err, volunteerQ){
        Volunteer.update({name:volunteerQ.name},
          {$pushAll: {interests:rawInterests}},{upsert:true},
          function(err){
            if(err){
              console.log(err);
            }else{
              console.log("successfully added");
              return callback(true);
            }
          })
        // var rawInterests = info.interests.split(',');
        // for(var i = 0; i < rawInterests.length; i++){
        //   volunteerQ.interests.push(rawInterests[i]);
        // }

        
      });
    }else{
      return callback(false);
    }
    
  })
};
