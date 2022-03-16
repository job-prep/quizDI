const express = require('express');
const authController = require('../controllers/authController.js');
const topicController = require('../controllers/topicsController.js');

const authRouter = express.Router();


// ------ will need to use authController after database is set up -----
// Create route for login
authRouter.post('/login', authController.login, topicController.getUserTopics, (req, res) => {
  // after logged in, redirect user to app
  res.status(200).send({ validAuth: true, user: res.locals.user, topics: res.locals.topics });
});


// route for signup 
authRouter.post('/signup', authController.signup, (req, res) => {
  // after successful signup, redirect user to app
  res.status(200).send({ validAuth: true, user: res.locals.user, topics: [] });
});



module.exports = authRouter; 