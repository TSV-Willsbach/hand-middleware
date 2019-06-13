const express = require('express');
const wordPressController = require('../controllers/wordPressController');

const wordPressRouter = express.Router();

wordPressRouter.get('/posts', wordPressController.getPosts);
wordPressRouter.get('/reports', wordPressController.getReports);
// teamRouter.get('/:id', wordPressController.getTeam);

module.exports = wordPressRouter;