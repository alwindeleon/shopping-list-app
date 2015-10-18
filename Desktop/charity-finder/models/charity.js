var mongoose = require('mongoose');

var charitySchema = new mongoose.Schema({
	name : {type: String, required:true},
  username: {type: String, required: true},
  password : {type: String, required:true},
	about: {type :String, required:true},
  tags: [{type :String}],
  needs: [{type :String}],
  currVolunteers: [{type :String}],
	email: {type :String, required:true},
  link: {type :String, required:true}
});

var charity = mongoose.model("charity",charitySchema);

module.exports = charity;