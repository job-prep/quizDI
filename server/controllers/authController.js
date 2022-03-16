const db = require('../models.js');

const authController = {};

// login
authController.login = (req, res, next) => {
  const { username, password } = req.body;
  const params = [ username ];
  const query = 'SELECT * FROM users WHERE username = $1';
  db.query(query, params)
    .then(result => {
      // if username doesn't exist
      if (result.rows.length === 0) {
        res.send({ validAuth: false });
      } else if (result.rows[0].password === password) {
      // if username exists and password matched
        console.log('password matched!');
        // save the user's information to res.locals and pass to the next middleware
        res.locals.user = result.rows[0];
        return next();
      } else {
        // if username exists but password not matched
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


// signup
authController.signup = (req, res, next) => {
    const { username, password } = req.body;
    const params = [ username ];
    const userInfo = `SELECT * FROM users WHERE username=$1`;
    db.query(userInfo, params)
      // if database returns a row of data, the username was found in the DB (user already exists)
      .then(result => {
        // if username already exists
        if (result.rows[0]) {
          res.send({ validAuth: false });
        } else {
          // if username doesn't exist, create user here
          const signUpParams = [ username, password ]; 
          const createUserQuery = `INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *`;
          db.query(createUserQuery, signUpParams)
          .then(result => {
            // save the created user's information to res.locals and pass to the next middleware
            res.locals.user = result.rows[0];
            return next();
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