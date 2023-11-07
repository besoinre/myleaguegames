import { useEffect, useState, useRef } from "react";
import leagueAPI from '../api/leagueAPI';

export default function useMatchHistory(encryptedSummonerId, selectedUserId) {

    const [historyData, setHistoryData] = useState([])
    const [historySummary, setHistorySummary] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [apiError, setApiError] = useState({})
    const isInitialRender = useRef(true);

    let previousGameDate = null
    let currentGameDate, currentFormattedGameDate
    let allMatches = []
    let games = []
    let sessionWins = 0
    let sessionLoses = 0
    let sessionKills = 0
    let sessionAssists = 0
    let sessionDeaths = 0
    let sessionCS = 0
    let sessionTimePlayed = 0

    let totalWins = 0
    let totalLoses = 0
    let totalKills = 0
    let totalAssists = 0
    let totalDeaths = 0
    let totalCS = 0
    let totalTimePlayed = 0

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    let apiCallRetry = 0
    const apiCall = () => {
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
                        wins: sessionWins,
                        loses: sessionLoses,
                        totalKills: sessionKills,
                        totalAssists: sessionAssists,
                        totalDeaths: sessionDeaths,
                        totalCS: sessionCS,
                        totalTimePlayed: sessionTimePlayed
                    })
                    games = []
                    sessionWins = 0
                    sessionLoses = 0
                    sessionKills = 0
                    sessionAssists = 0
                    sessionDeaths = 0
                    sessionCS = 0
                    sessionTimePlayed = 0
                }
                if (game.gameResult === "Win") {
                    sessionWins++
                    totalWins++
                } else {
                    sessionLoses++
                    totalLoses++
                }
                sessionKills += selectedParticipant.kills
                totalKills += selectedParticipant.kills

                sessionAssists += selectedParticipant.assists
                totalAssists += selectedParticipant.assists

                sessionDeaths += selectedParticipant.deaths
                totalDeaths += selectedParticipant.deaths

                sessionCS += selectedParticipant.totalMinionsKilled + selectedParticipant.neutralMinionsKilled
                totalCS += selectedParticipant.totalMinionsKilled + selectedParticipant.neutralMinionsKilled

                sessionTimePlayed += (game.info.gameEndTimestamp - game.info.gameStartTimestamp)
                totalTimePlayed += (game.info.gameEndTimestamp - game.info.gameStartTimestamp)

                games.push({ game: game, selectedParticipant: selectedParticipant })
                previousGameDate = currentFormattedGameDate
            })
            allMatches.push({
                date: previousGameDate,
                games: games,
                wins: sessionWins,
                loses: sessionLoses,
                totalKills: sessionKills,
                totalAssists: sessionAssists,
                totalDeaths: sessionDeaths,
                totalCS: sessionCS,
                totalTimePlayed: sessionTimePlayed
            })
            setHistoryData(allMatches)
            setHistorySummary(
                {
                    totalKills,
                    totalAssists,
                    totalDeaths,
                    totalCS,
                    totalTimePlayed,
                    totalWins,
                    totalLoses
                }
            )
            setIsLoading(false)
        })
        .catch(error => {
            if (apiCallRetry < 3) {
                apiCallRetry++
                setTimeout(apiCall, 10000)
            } else {
                setApiError(error)
                setIsLoading(false)
            }
        });
    }


    useEffect(() => {

        if (isInitialRender.current) {
            isInitialRender.current = false;
            return;
        }

        if (typeof encryptedSummonerId !== "undefined") {
            setIsLoading(true)
            setHistoryData([])
            setApiError({})
            apiCall()
        }
        return () => {
            setIsLoading(true)
            setHistoryData([])
            setHistorySummary({})
            setApiError({})
        }
    }, [encryptedSummonerId]);

    return [historyData, historySummary, isLoading, apiError]
}