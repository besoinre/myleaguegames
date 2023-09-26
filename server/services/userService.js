const leagueAPI = require('./leagueAPI')

function checkSummonerExistence(userName, res) {    
    leagueAPI.get(`summoner/v4/summoners/by-name/${userName}`)
        .then(response => {
           res.json(response.data)
        })
        .catch(error => {
            res.status(500).json({ error: 'An error occurred while fetching data from the Riot API : ', error });
        });
} 

function getSummonerInformation(userName, res) {    
    leagueAPI.get(`summoner/v4/summoners/by-name/${userName}`)
        .then(response => {
            let summonerData = response.data
            leagueAPI.get(`league/v4/entries/by-summoner/${summonerData.id}`)
            .then(response => {
                let mergedResponses = {
                    summonerData : summonerData,
                    rankingData : response.data
                }
                res.json(mergedResponses)
            })
            .catch(error => {
                res.status(500).json({ error: 'An error occurred while fetching data from the Riot API : ', error });
            })
        })
        .catch(error => {
            res.status(500).json({ error: 'An error occurred while fetching data from the Riot API : ', error });
        });
}


module.exports = { getSummonerInformation, checkSummonerExistence };