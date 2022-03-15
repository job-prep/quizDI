const express = require('express');
const path = require('path');
const authController = require('../controllers/authController.js')

const authRouter = express.Router();

// Create route for login
authRouter.post('/login', (req, res) => {
  return res.status(200).json('User Successfully Logged in');
});


// route for signup 
authRouter.post('/signup', authController.signUp, (req,res) => {
return res.status(200).send('User Successfully Created')
});



module.exports = authRouter; 