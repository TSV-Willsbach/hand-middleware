const express = require('express');
const wordPressController = require('../controllers/wordPressController');

const wordPressRouter = express.Router();

wordPressRouter.get('/posts', wordPressController.getPosts);
// teamRouter.get('/:id', wordPressController.getTeam);

module.exports = wordPressRouter;