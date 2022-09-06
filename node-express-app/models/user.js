// DEPENDENCIES
const mongoose = require('mongoose');

// SCHEMA
const UserSchema  = new mongoose.Schema({
  username :{
      type  : String,
      required : true
  } ,
  email :{
    type  : String,
    required : true
  } ,
  password :{
    type  : String,
    required : true
  } ,
  creation_date :{
    type : Date,
    default : Date.now
  }
});

// MODEL
const User = mongoose.model('User', UserSchema);

// EXPORT
module.exports = User;