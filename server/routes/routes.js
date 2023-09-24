const leagueService = require('../services/leagueService');

const express = require('express');
const router = express.Router();

router.get('/user/:userName', async (req, res) => {
    leagueService.getSummonerInformation(req.params.userName, res)
  });

module.exports = router;