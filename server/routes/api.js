const express = require('express');
const User = require('../models/user.js');


const router = new express.Router();


router.get('/dashboard', (req, res) => {
  res.status(200).json({
    message: req.body.email
  });
});



// router.get('/dashboard', (req, res) => {
//   //look for user
//   console.log("31231" + req.email);
//   User.findOne({ email: req.email }, (err, user) => {
//     if (err) res.send(err); 

//     // check if a hashed user's password is equal to a value saved in the database
//     res.status(200).json(user);
//   })

// });


module.exports = router;
