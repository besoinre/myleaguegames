const { leagueAPIeuw, leagueAPIeurope } = require('./leagueAPI')

function checkSummonerExistence(userName, tag, res) {
    leagueAPIeurope.get(`riot/account/v1/accounts/by-riot-id/${userName}/${tag}`)
        .then(response => {
            res.json(response.data)
        })
        .catch(error => {
            res.status(500).json({ error: 'An error occurred while fetching data from the Riot API : ', error });
        });
}

function getSummonerInformation(puuid, res) {
    leagueAPIeurope.get(`/riot/account/v1/accounts/by-puuid/${puuid}`)
        .then(response => {
            const accountData = response.data
            leagueAPIeuw.get(`summoner/v4/summoners/by-puuid/${puuid}`)
                .then(response => {
                    const summonerData = response.data
                    leagueAPIeuw.get(`league/v4/entries/by-summoner/${summonerData.id}`)
                        .then(response => {
                            const rankingData = response.data
                            const mergedResponses = {
                                accountData,
                                summonerData,
                                rankingData
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
        }).catch(error => {
            res.status(500).json({ error: 'An error occurred while fetching data from the Riot API : ', error });
        })
}




module.exports = { getSummonerInformation, checkSummonerExistence };