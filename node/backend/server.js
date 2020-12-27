const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const dbPath = require('./database/db');
const jwt = require('jsonwebtoken');


    mongoose.Promise = global.Promise;
    mongoose.connect(dbPath.db, { useNewUrlParser: true,useUnifiedTopology: true, useFindAndModify: false }).
    then(() => {
        console.log("database connected");
    },error=>{
        console.log('could not connect to database : ' + error);
    });

    function verifyToken(req, res, next) {
      if(!req.headers.authorization) {
        return res.status(401).send('Unauthorized request')
      }
      let token = req.headers.authorization.split(' ')[1]
      if(token === 'null') {
        return res.status(401).send('Unauthorized request')
      }
      let payload = jwt.verify(token, 'mysecretkey')
      if(!payload) {
        return res.status(401).send('Unauthorized request')
      }
      req.userId = payload.subject;
      next();
    }



const userRoute = require('./routes/userEntry');
const imageRoute = require('./routes/uploadimage');

const app = express();
      app.use(cors());
      app.use(bodyParser.json());
      app.use(bodyParser.urlencoded({ extended: false }));
      app.use(express.static('uploads'));
      app.use("/api/userdetails", userRoute);
      app.use("/api/moments", imageRoute);

var PORT = process.env.PORT | 3000;

app.listen(PORT, ()=> {
    console.log('Listening on ' + PORT);
});

app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
  });

  app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
      error: {
        message: error.message
      }
    });
  });

