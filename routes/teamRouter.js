const express = require('express');
const Team = require('../models/Team');
const teamController = require('../controllers/teamController');


const teamRouter = express.Router();

teamRouter.get('/', teamController.getTeams);
teamRouter.get('/:id', teamController.getTeam);

module.exports = teamRouter;