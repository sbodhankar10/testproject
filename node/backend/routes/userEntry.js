const express =  require('express');
const router = express();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

var salt = bcrypt.genSaltSync(10);

const loginRegSchema = require('../models/userModel');

//user registration
router.post('/add',(req, res, next) => {
  let saveDetails = new loginRegSchema.registerSchema({
    _id: mongoose.Types.ObjectId(),
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    mobile: req.body.mobileno,
    email: req.body.email,
    city: req.body.city,
    password: req.body.password
  });

bcrypt.hash(req.body.password, salt, (err, hash) => {
  if(err) { throw err; }
  saveDetails.password =  hash;

  saveDetails
  .save()
  .then( reply => {
    res.send({
      message:'user created successfully',
      status: "success"
    })
  })
  .catch( err =>{
    console.log(err);
  })
});
});



//login
router.post('/userLogin', (req, res, next) => {

  loginRegSchema.userloginSchema.find({email: req.body.email})
  .select('email password')
  .exec()
  .then(response => {
    let dbpass = response[0].password;
    bcrypt.compare(req.body.password, dbpass)
    .then( getresponse => {
        if(!getresponse)
        {
          return res.status(401).json({
            status:"fail",
            message: "Invalid Password"
          });
        }

        let payload = {subject: response[0]._id};
        let token = jwt.sign(payload, 'mysecretkey');


          return res.status(200).json({
            status:"success",
            message: "Login successfull",
            token: token,
            uid: response[0]._id
          });

      })
      .catch( error=> {
        res.send(500).json({
          status: "fail",
          message: "Fail to verify password."
        });
      })

  })
 .catch( err=>{
  res.status(404).json({
    status: "fail",
    message: "Email not exist"
  });
 })


});


module.exports = router;
