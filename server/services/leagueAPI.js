const axios = require('axios');
require('dotenv').config();

const leagueAPI = axios.create({
    baseURL: `https://euw1.api.riotgames.com/lol/`,
    headers: {
        accept: 'application/json',
        "X-Riot-Token": process.env.REACT_APP_API_KEY_RIOT
    }
});

module.exports = leagueAPI ;