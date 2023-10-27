import { useEffect, useState, useRef } from "react";
import leagueAPI from '../api/leagueAPI';

export default function useMatchHistory(encryptedSummonerId, selectedUserId) {

    const [historyData, setHistoryData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [apiError, setApiError] = useState({})
    const isInitialRender = useRef(true);

    let previousGameDate = null
    let currentGameDate, currentFormattedGameDate
    let allMatches = []
    let games = []
    let wins = 0
    let loses = 0
    let totalKills = 0
    let totalAssists = 0
    let totalDeaths = 0
    let totalCS = 0
    let totalTimePlayed = 0

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    useEffect(() => {

        if (isInitialRender.current) {
            isInitialRender.current = false;
            return;
        }

        if (typeof encryptedSummonerId !== "undefined") {
            console.log('loading : ' + isLoading)
            setIsLoading(true)
            setHistoryData([])
            setApiError({})

            leagueAPI.get(`/api/match-history/${encryptedSummonerId}`)
                .then(response => {
                    response.data.forEach((game) => {
                        let selectedParticipant = game.info.participants.filter((element) => element.summonerId === selectedUserId)[0]

                        currentGameDate = new Date(game.info.gameEndTimestamp)
                        currentFormattedGameDate = currentGameDate.getDate() + " " + monthNames[Number(currentGameDate.getMonth())] + " " + currentGameDate.getFullYear()
                        if (currentFormattedGameDate !== previousGameDate && previousGameDate !== null) {
                            allMatches.push({
                                date: previousGameDate,
                                games: games,
                                wins: wins,
                                loses: loses,
                                totalKills: totalKills,
                                totalAssists: totalAssists,
                                totalDeaths: totalDeaths,
                                totalCS: totalCS,
                                totalTimePlayed: totalTimePlayed
                            })
                            games = []
                            wins = 0
                            loses = 0
                            totalKills = 0
                            totalAssists = 0
                            totalDeaths = 0
                            totalCS = 0
                            totalTimePlayed = 0
                        }
                        (game.gameResult === "Win"
                            ? wins++
                            : loses++
                        )
                        totalKills += selectedParticipant.kills
                        totalAssists += selectedParticipant.assists
                        totalDeaths += selectedParticipant.deaths
                        totalCS += selectedParticipant.totalMinionsKilled + selectedParticipant.neutralMinionsKilled
                        totalTimePlayed += (game.info.gameEndTimestamp - game.info.gameStartTimestamp)
                        games.push({ game: game, selectedParticipant: selectedParticipant })
                        previousGameDate = currentFormattedGameDate
                    })
                    setHistoryData(allMatches)
                    setIsLoading(false)
                })
                .catch(error => {
                    setApiError(error)
                    setIsLoading(false)
                });
        }
        return () => {
            setIsLoading(true)
            setHistoryData([])
            setApiError({})
        }
    }, [encryptedSummonerId]);

    return [historyData, isLoading, apiError]
}