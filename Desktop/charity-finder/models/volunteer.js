var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  name: {type: String,required: true},
  username: {type: String, required: true},
  password: {type: String, required: true},
  interests: [{type :String}],
  email: {type:String},
});

var user = mongoose.model("volunteer",userSchema);

module.exports = user;