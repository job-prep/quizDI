//const db = require('../models/dbModel.js')
const path = require('path');

const authController = {};

// login middlware
authController.login = (req, res, next) => {
  const { username, password } = req.body;
}



authController.signup = (req, res, next) => {
    // Step1: validate input 
    // if (!req.body.userInfo
    //     || typeof req.body.userInfo.username !== 'string' 
    //     || typeof req.body.userInfo.password !== 'string')
        
    // error handling if username and password do not match validation criteria 
    //Step2: Create new user in database 
}


module.exports = authController;