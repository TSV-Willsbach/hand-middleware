const express = require('express');
const hvwController = require('../controllers/hvwController');

const hvwRouter = express.Router();

hvwRouter.get('/games', hvwController.getGames);
hvwRouter.get('/games/:id', hvwController.getGame);
hvwRouter.get('/ligue', hvwController.getLigue);

module.exports = hvwRouter;