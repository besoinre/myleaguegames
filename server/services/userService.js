const {leagueAPIeuw, leagueAPIeurope} = require('./leagueAPI')

function checkSummonerExistence(userName, tag, res) {    
    leagueAPIeurope.get(`riot/account/v1/accounts/by-riot-id/${userName}/${tag}`)
        .then(response => {
           res.json(response.data)
        })
        .catch(error => {
            res.status(500).json({ error: 'An error occurred while fetching data from the Riot API : ', error });
        });
} 

function checkSummonerExistenceOld(userName, res) {    
    leagueAPIeuw.get(`summoner/v4/summoners/by-name/${userName}`)
        .then(response => {
           res.json(response.data)
        })
        .catch(error => {
            res.status(500).json({ error: 'An error occurred while fetching data from the Riot API : ', error });
        });
} 

function getSummonerInformationOld(userName, res) {    
    leagueAPIeuw.get(`summoner/v4/summoners/by-name/${userName}`)
        .then(response => {
            let summonerData = response.data
            leagueAPIeuw.get(`league/v4/entries/by-summoner/${summonerData.id}`)
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

function getSummonerInformation(puuid, res) {    
    leagueAPIeuw.get(`summoner/v4/summoners/by-puuid/${puuid}`)
        .then(response => {
            let summonerData = response.data
            leagueAPIeuw.get(`league/v4/entries/by-summoner/${summonerData.id}`)
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