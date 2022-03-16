const express = require('express');
const topicsController = require('../controllers/topicsController.js');

const topicsRouter = express.Router();

// /topics/topic
// return notes and flashcards of the topic to the user
topicsRouter.get('/getTopic', 
  topicsController.getNotesFromUserTopic, 
  topicsController.getFlashcardsFromUserTopic, 
  (req, res) => {
    res.status(200).json({ notes: res.locals.notes, flashcards: res.locals.flashcards });
});

// /topics/createTopic
// create a topic and send back all topics belonging to the user
topicsRouter.post('/createTopic', 
  topicsController.postUserTopic, 
  topicsController.getUserTopics, 
  (req, res) => {
    res.status(200).json({ topics: res.locals.topics });
});

// /topics/submitFlashcard
// create a flashcard under a topic, and send back all flashcards belonging to the topic and user
topicsRouter.post('/submitFlashcard', 
  topicsController.postUserFlashcard, 
  topicsController.getFlashcardsFromUserTopic, 
  (req, res) => {
    res.status(200).json({ flashcards: res.locals.flashcards });
});

// /topics/submitNote
// create a note under a topic, and send back all notes belonging to the topic and user 
topicsRouter.post('/submitNote', 
  topicsController.postUserNote, 
  topicsController.getNotesFromUserTopic, 
  (req, res) => {
    res.status.json({ notes: res.locals.notes });
});



module.exports = topicsRouter;