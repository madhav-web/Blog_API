const mongoose = require("mongoose");
const UserSchema = mongoose.Schema({
  title : String,
  description : String,
  tags : String,
  cloudinary_id : String,
  url : String,
  username : String
})


module.exports  = mongoose.model('items', UserSchema);
