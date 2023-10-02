const axios = require('axios');
require('dotenv').config();

const leagueAPIeuw = axios.create({
    baseURL: `https://euw1.api.riotgames.com/lol/`,
    headers: {
        accept: 'application/json',
        "X-Riot-Token": process.env.REACT_APP_API_KEY_RIOT
    }
});


const leagueAPIeurope = axios.create({
    baseURL: `https://europe.api.riotgames.com/lol/`,
    headers: {
        accept: 'application/json',
        "X-Riot-Token": process.env.REACT_APP_API_KEY_RIOT
    }
});

module.exports = {leagueAPIeuw, leagueAPIeurope} ;