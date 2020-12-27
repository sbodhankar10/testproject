const mongoose = require('mongoose');
const schema = mongoose.Schema;

//register schema
let registerSchema = new schema({
  firstname: String,
  lastname : String,
  mobile:String,
  email: String,
  city: String,
  password: String,
},{
  collection: 'userProfile'
});

var getregisterSchema = mongoose.model('registerSchema', registerSchema);

//login schema
let userLoginSchema = new schema({
  _id: String,
  email: {
    type: String,
    required: true
  },
  password: {
    type:String,
    required: true
  }
},{
  collection: 'userProfile'
});

var getuserLoginSchema = mongoose.model('userLoginSchema', userLoginSchema);

module.exports = {
  registerSchema: getregisterSchema,
  userloginSchema: getuserLoginSchema
}
