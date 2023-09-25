const leagueService = require('../services/leagueService');

const express = require('express');
const router = express.Router();

router.get('/user/information/:userName', async (req, res) => {
  leagueService.getSummonerInformation(req.params.userName, res)
});

router.get('/user/existence/:userName', async (req, res) => {
  leagueService.checkSummonerExistence(req.params.userName, res)
});

module.exports = router;