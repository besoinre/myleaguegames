const leagueAPI = require('./leagueAPI')

function getActiveGame(encryptedSummonerId, res) {
    leagueAPI.get(`spectator/v4/active-games/by-summoner/${encryptedSummonerId}`)
        .then(response => {
            res.json(response.data)
        })
        .catch(error => {
            res.status(500).json({ error: 'An error occurred while fetching data from the Riot API : ', error });
        })
}

module.exports = { getActiveGame };