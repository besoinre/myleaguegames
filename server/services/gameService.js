const { leagueAPIeuw, leagueAPIeurope } = require('./leagueAPI')

function getActiveGame(encryptedSummonerId, res) {
    leagueAPIeuw.get(`spectator/v4/active-games/by-summoner/${encryptedSummonerId}`)
        .then(response => {
            const data = response.data
            let participantPromises = [];
            data.participants.forEach((participant) => {
                participantPromises.push(leagueAPIeuw.get(`league/v4/entries/by-summoner/${participant.summonerId}`));
            });
            Promise.all(participantPromises)
                .then((responses) => {
                    const responseDataArray = responses.map((response) => response.data);
                    const updatedParticipants = data.participants.map((participant) => {
                        const summonerData = responseDataArray.find((summoner) => summoner[0].summonerId === participant.summonerId);
                        return ({
                            ...participant,
                            rank: summonerData[0].tier + " " + summonerData[0].rank,
                            lp: summonerData[0].leaguePoints
                        })
                    })
                    res.json({
                        ...data,
                        participants: updatedParticipants
                    })
                })
                .catch(error => {
                    res.status(500).json({ error: 'An error occurred while fetching data from the Riot API : ', error });
                })
        })
        .catch(error => {
            res.status(500).json({ error: 'An error occurred while fetching data from the Riot API : ', error });
        })
}

function getMatchHistory(puuid, res) {
    if (typeof puuid !== "undefined" && puuid.trim() !== "") {
        leagueAPIeurope.get(`match/v5/matches/by-puuid/${puuid}/ids?start=0&count=10`)
            .then(response => {
                let gamePromises = [];
                response.data.forEach((game) => {
                    gamePromises.push(leagueAPIeurope.get(`match/v5/matches/${game}`));
                });
                const gamesResponse = []
                Promise.all(gamePromises)
                    .then((responses) => {
                        const responseDataArray = responses.map((response) => response.data);
                        responseDataArray.forEach((gameData) => {
                            const filteredParticipant = gameData.info.participants.filter((participant) => participant.puuid === puuid)
                            gamesResponse.push({
                                ...gameData,
                                gameResult: filteredParticipant[0].win == true ? "Win" : "Defeat",
                                championName: filteredParticipant[0].championName
                            })
                        })
                        res.json(gamesResponse)
                    })
                    .catch(error => {
                        res.status(500).json({ error: 'An error occurred while fetching data from the Riot API : ', error });
                    })
            })
            .catch(error => {
                res.status(500).json({ error: 'An error occurred while fetching data from the Riot API : ', error });
            })
    }
}

module.exports = { getActiveGame, getMatchHistory };