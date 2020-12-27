const express =  require('express');
const router = express();
const path = require('path');
const fs = require('fs');

const multer = require('multer');
var Storage = multer.diskStorage({
  destination: function(req, file, callback) {
      callback(null, "uploads/");
  },
  filename: function(req, file, callback) {
      callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
  }
});

var upload = multer({ storage: Storage });

const imgSchema = require('../models/imageModel');

router.post('/upload', upload.array('userfiles',10),(req, res, next) => {
  const reqFiles = []
  for (var i = 0; i < req.files.length; i++) {
    reqFiles.push(req.files[i].filename)
  }
  let getImg = new imgSchema({
    title: req.body.title,
    tag: req.body.tag,
    uid: req.body.uid,
    filename: reqFiles
  })
  getImg
  .save()
  .then( reply => {
    res.send({
      message:'image uploaded successfully',
      data: reply
    })
  })
  .catch( err =>{
    console.log(err);
  })
});

router.get('/view', (req,res,next) => {
  imgSchema.find({uid: req.query.uid})
  .exec()
  .then( reply =>{
   res.status(200).send({
     data:reply
   });

  })
  .catch( err => {
    res.status(500).json(err);
  })
});

router.get('/view/:id', (req,res,next) => {
  imgSchema.find({_id:  req.params.id })
  .exec()
  .then( reply =>{
   res.status(200).send({
     data:reply
   });

  })
  .catch( err => {
    res.status(500).json(err);
  })
});

router.put('/update/:id',upload.array('userfiles',10), (req, res, next) => {

  const reqFiles = []
  for (var i = 0; i < req.files.length; i++) {
    reqFiles.push(req.files[i].filename)
  }

  if(req.files.length > 0){
    var getImgdata = {
      title: req.body.title,
      tag: req.body.tag,
      filename: reqFiles
    }

  }else{
    var getImgdata = {
      title: req.body.title,
      tag: req.body.tag
    }

  }

let id = req.params.id ;
  imgSchema.findOneAndUpdate({_id: id}, {$set: getImgdata} )
  .then(stat => {
    res.status(200).send({
      message:'Record updated successfully',
      data: stat
    })
  })
  .catch(err =>{
      res.json(err);
  })
});




router.delete('/delete/:id', (req, res, next) => {

  imgSchema.find({_id:  req.params.id })
  .exec()
  .then( data=> {
   if(!data[0].filename){
     return res.json("file not found");
   }
   let file = data[0].filename;
   fs.unlink("uploads/"+file, (err) => {
     if(err) return err;
     res.status(200).send(
       {
        status: "success",
        message: "file removed successfully"
       }
     )
   })

  })
  .catch( err =>{
    console.log(err);
  })

  imgSchema.deleteOne({ _id: req.params.id })
  .exec()
  .then( reply => {
    res.status(200).send({
      status: "success",
      message: "data removed successfully"
     });
  })
  .catch( err=> { res.status(500).send(err)} )
})


module.exports = router;
