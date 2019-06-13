const express = require('express');
const playerController = require('../controllers/playerController');

const playerRouter = express.Router();

playerRouter.get('/', playerController.getPlayers);
playerRouter.get('/:id', playerController.getPlayer);
playerRouter.post('/add', playerController.addPlayer);
playerRouter.post('/update/:id', playerController.updatePlayer);
playerRouter.get('/delete/:id', playerController.deletePlayer);

module.exports = playerRouter;