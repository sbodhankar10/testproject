const mongoose = require('mongoose');
const schema = mongoose.Schema;

let imgSchema = new schema({
  title: String,
  tag: String,
  uid: String,
  time : { type : Date, default: Date.now },
  filename: { type: Array },
},{
  collection: 'imageUpload'
});

module.exports = mongoose.model('imgSchema', imgSchema);
