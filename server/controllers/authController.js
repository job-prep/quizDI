const db = require('../models.js');

const authController = {};

// login middlware
authController.login = (req, res, next) => {
  const { username, password } = req.body;
  const params = [ username ];
  const query = 'SELECT * FROM users WHERE username = $1';
  db.query(query, params)
    .then(result => {
      // if there is no such username
      if (result.rows.length === 0) {
        res.send({ validAuth: false });
      } else if (result.rows[0].password === password) {
        // if username found and password matched
        console.log('password matched!');
        res.locals.user = result.rows[0];
        return next();
      } else {
        // if username found but password not matched
        console.log('password not matched!');
        res.send({ validAuth: false });
      }
    })
    .catch(err => {
      next({
        log: `authController.login: ERROR: ${err}`,
        message: { err: `Error in authController.login` }
      });
    });
}



authController.signup = (req, res, next) => {
    const { username, password } = req.body;
    const params = [ username ];
    const userInfo = `SELECT * FROM users WHERE username=$1`;
    db.query(userInfo, params)
      // if database returns a row of data, the username was found in the DB (user already exists)
      .then(result => {
        if(result.rows[0]) {
          // res.locals.user = {
          //   validSignUp: false 
          // }
          // return next();
          res.send({ validAuth: false });
        } else {
          // Otherwise, create user here
          const signUpParams = [ username, password ]; 
          const createUserQuery = `INSERT INTO users (username, password) VALUES ($1, $2) `
          db.query(createUserQuery, signUpParams)
          .then(result =>{
            res.locals.user = result.rows[0];
            return next ();
          });
        }
      })
      .catch(err => {
        next({
          log: `authController.signup: ERROR: ${err}`,
          message: { err: `Error in authController.signup` }
        });
      });
};


module.exports = authController;