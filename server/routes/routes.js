const userService = require('../services/userService');
const gameService = require('../services/gameService');
const cdragonService = require('../services/cdragonService');

const express = require('express');
const router = express.Router();

router.get('/user/information/:userName', async (req, res) => {
  userService.getSummonerInformation(req.params.userName, res)
});

router.get('/user/existence/:userName', async (req, res) => {
  userService.checkSummonerExistence(req.params.userName, res)
});

router.get('/active-game/:encryptedSummonerId', async (req, res) => {
  gameService.getActiveGame(req.params.encryptedSummonerId, res)
});

router.get('/champions-position', async (req, res) => {
  cdragonService.getChampionsPosition(res)
});

router.get('/match-history/:puuid', async (req, res) => {
  gameService.getMatchHistory(req.params.puuid, res)
});

module.exports = router;