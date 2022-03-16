const db = require('../models.js');

const topicsController = {};

// fetch all topics that belong to the user
topicsController.getUserTopics = (req, res, next) => {
  let userId;
  if (res.locals.user) {
    // if a user is logging in, res.locals.user will be truthy, extract userid from res.locals
    const { _id } = res.locals.user;
    userId = _id;
  } else {
    // if already logged in, res.locals.user will be falsy, extract userid from req.body
    const { userid } = req.body;
    userId = userid;
  }
  
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

// fetch current topic's notes
topicsController.getNotesFromUserTopic = (req, res, next) => {
  const { topicid } = req.body;
  // use topicid to fetch notes
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
  // use topicid to fetch flashcards
  const query = `SELECT * FROM flashcards WHERE topicid=$1`;
  const params = [ topicid ];
  db.query(query, params)
    .then(flashcards => {
      // save retrieved flashcards to res.locals
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

// create a topic using topic's title and userid
topicsController.postUserTopic = (req, res, next) => {
  const { title, userid } = req.body;
  // use title and userid to create a topic
  const query = `INSERT INTO topics (title, userid) VALUES ($1, $2)`;
  const params = [ title, userid ];
  db.query(query, params)
    .then(topic => {
      return next();
    })
    .catch(err => {
      next({
        log: `topicsController.postUserTopic: ERROR: ${err}`,
        message: { err: `Error in topicsController.postUserTopic` }
      });
    });
}


// create a flashcard
topicsController.postUserFlashcard = (req, res, next) => {
  const { topicid, question, answer } = req.body;
  // use topicid, question and answer
  const query = `INSERT INTO flashcards (topicid, question, answer) VALUES ($1, $2, $3)`;
  const params = [ topicid, question, answer ];
  db.query(query, params)
    .then(flashcard => {
      return next();
    })
    .catch(err => {
      next({
        log: `topicsController.postUserFlashcard: ERROR: ${err}`,
        message: { err: `Error in topicsController.postUserFlashcard` }
      });
    });
}


// create a note
topicsController.postUserNote = (req, res, next) => {
  const { topicid, content } = req.body;
  // use topicid and content
  const query = `INSERT INTO notes (topicid, content) VALUES ($1, $2)`;
  const params = [ topicid, content ];
  db.query(query, params)
    .then(note => {
      return next();
    })
    .catch(err => {
      next({
        log: `topicsController.postUserNote: ERROR: ${err}`,
        message: { err: `Error in topicsController.postUserNote` }
      });
    });
}

module.exports = topicsController;