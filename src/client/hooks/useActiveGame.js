import { useEffect, useState } from "react";
import leagueAPI from '../api/leagueAPI';
import { useContext } from 'react';
import { GlobalStateContext } from '../App';


function findKeyByValue(obj, value) {
    for (let key in obj) {
        if (obj[key] === value) {
            return key;
        }
    }
    return null;
}

export default function useActiveGame(encryptedSummonerId) {

    const [gameData, setGameData] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [apiError, setApiError] = useState({})

    const { globalState } = useContext(GlobalStateContext);
    const rankLP = {
        "IRON": 0,
        "BRONZE": 400,
        "SILVER": 800,
        "GOLD": 1200,
        "PLATINUM": 1600,
        "EMERALD": 2000,
        "DIAMOND": 2400,
        "MASTER": 2800,
        "GRANDMASTER": 2800,
        "CHALLENGER": 2800
    }

    const tierLP = {
        "I": 300,
        "II": 200,
        "III": 100,
        "IV": 0
    }

    let patch = globalState.patch
    useEffect(() => {
        if (typeof encryptedSummonerId !== "undefined") {
            setIsLoading(true)
            setGameData({})
            setApiError({})
            leagueAPI.get(`/api/active-game/${encryptedSummonerId}`)
                .then(response => {
                    const data = response.data
                    const participantsByTeam = {}
                    let averageRank = 0;
                    let nbRankedPlayers = 0

                    data.participants.forEach((participant) => {
                        if (participant.rank) {
                            nbRankedPlayers++
                            const [tier, division] = participant.rank.split(" ")

                            if (tier == "MASTER" || tier == "GRANDMASTER" || tier == "CHALLENGER") {
                                averageRank += participant.lp + rankLP[tier]
                            } else {
                                averageRank += participant.lp + rankLP[tier] + tierLP[division]
                            }
                        }
                        const { teamId } = participant
                        if (!participantsByTeam[teamId]) {
                            participantsByTeam[teamId] = [];
                        }
                        participantsByTeam[teamId].push({
                            ...participant,
                            champion: patch[participant.championId]
                        })
                    })
                    const averageRankPerPlayer = averageRank / nbRankedPlayers
                    const remainder = averageRankPerPlayer % 400
                    const averageRankRounded = Math.min(averageRankPerPlayer - (remainder), 2800)
                    let rank = findKeyByValue(rankLP, averageRankRounded)
                    let tier = ""
                    let lp = 0
                    if (averageRankRounded === 2800) {
                        lp = Math.trunc(averageRankPerPlayer - 2800)
                    } else {
                        tier = findKeyByValue(tierLP, Math.trunc(remainder / 100) * 100) 
                        lp = Math.trunc(remainder % 100)
                    }

                    const rolesOrder = ["TOP", "JUNGLE", "MIDDLE", "BOTTOM", "UTILITY"]
                    let bestPermutations = []

                    for (const teamId in participantsByTeam) {
                        const team = participantsByTeam[teamId]

                        const permutations = getPermutations(team)
                        let bestPermutation = []
                        let bestResult = 0
                        permutations.forEach((permutation) => {
                            let i = 0
                            let currentResult = 0
                            permutation.forEach((participant) => {
                                if ((participant.spell1Id === 11 || participant.spell2ID === 11) && rolesOrder[i] === "JUNGLE") {
                                    currentResult += 999
                                } else {
                                    currentResult += participant.champion.rolesPlayrate[rolesOrder[i]].playRate
                                }
                                i++
                            })
                            bestResult = Math.max(bestResult, currentResult)
                            if (bestResult === currentResult) {
                                bestPermutation = permutation
                            }
                        })
                        bestPermutations.push(bestPermutation)
                    }
                    setGameData({
                        ...data,
                        teamsConfiguration: bestPermutations,
                        rank: rank,
                        tier: tier,
                        lp: lp
                    })
                    setIsLoading(false)
                })
                .catch(error => {
                    setApiError(error)
                    setIsLoading(false)
                });
        }
    }, [encryptedSummonerId, globalState.refresh]);

    return [gameData, isLoading, apiError]
}

function getPermutations(arr) {
    const result = [];
    function permute(arr, current = []) {
        if (arr.length === 0) {
            result.push(current);
            return;
        }
        for (let i = 0; i < arr.length; i++) {
            const remaining = arr.slice(0, i).concat(arr.slice(i + 1));
            permute(remaining, current.concat(arr[i]));
        }
    }
    permute(arr);
    return result;
}