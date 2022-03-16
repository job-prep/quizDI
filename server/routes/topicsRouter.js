const express = require('express');
const topicsController = require('../controllers/topicsController.js');

const topicsRouter = express.Router();

// return notes and flashcards of the topic to the user
// /topics/topic
topicsRouter.get('/topic', topicsController.getNotesFromUserTopic, topicsController.getFlashcardsFromUserTopic, (req, res) => {
  res.status(200).json({ notes: res.locals.notes, flashcards: res.locals.flashcards });
});

topicsRouter.post('/createTopic', topicsController.postUserTopics, topicsController.getUserTopics, (req, res) => {

});

module.exports = topicsRouter;