const db = require('../models.js');

const topicsController = {};

topicsController.getUserTopics = (req, res, next) => {
  const { userId: _id } = res.locals.user;
  const query = `SELECT * FROM topics WHERE userid = $1`;
  const params = [ userId ];
  db.query(query, params)
    .then(topics => {
      res.locals.topics = topics.rows;
      return next();
    })
    .catch(err => {
      next({
        log: `topicsController.getUserTopics: ERROR: ${err}`,
        message: { err: `Error in topicsController.getUserTopics` }
      });
    });
}

// fetch current topic's notes from database and return to user
topicsController.getNotesFromUserTopic = (req, res, next) => {
  const { topicid } = req.body;
  const query = `SELECT * FROM notes WHERE topicid=$1`;
  const params = [ topicid ];
  db.query(query, params)
    .then(notes => {
      res.locals.notes = notes.rows;
      return next();
    })
    .catch(err => {
      next({
        log: `topicsController.getNotesFromUserTopic: ERROR: ${err}`,
        message: { err: `Error in topicsController.getNotesFromUserTopic` }
      });
    });
}

// fetch current topic's flashcards from database and return to user
topicsController.getFlashcardsFromUserTopic = (req, res, next) => {
  const { topicid } = req.body;
  // use topicid to fetch user's topics
  const query = `SELECT * FROM flashcards WHERE topicid=$1`;
  const params = [ topicid ];
  db.query(query, params)
    .then(flashcards => {
      res.locals.flashcards = flashcards.rows;
      return next();
    }) 
    .catch(err => {
      next({
        log: `topicsController.getFlashcardsFromUserTopic: ERROR: ${err}`,
        message: { err: `Error in topicsController.getFlashcardsFromUserTopic` }
      });
    });
}

// post request for user to create topics 
topicsController.postUserTopics = (req, res, next) => {
  const { title, userid } = req.body;
  // use title and userid to create a topic
  const query = `INSERT INTO topics (title, userid) VALUES ($1, $2)`;
  const params = [ title, userid ];
  db.query(query, params)
    .then(topics => {
      return next();
    })
    .catch(err => {
      next({
        log: `topicsController.postUserTopics: ERROR: ${err}`,
        message: { err: `Error in topicsController.postUserTopics` }
      });
    });
}

// post request for user to create notes 

// post request for user to create flashcards 

module.exports = topicsController;