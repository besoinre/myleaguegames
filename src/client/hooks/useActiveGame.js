import { useEffect, useState } from "react";
import leagueAPI from '../api/leagueAPI';
import { useContext } from 'react';
import { GlobalStateContext } from '../App';

export default function useActiveGame(encryptedSummonerId) {

    const [gameData, setGameData] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [apiError, setApiError] = useState({})

    const { globalState } = useContext(GlobalStateContext);
    let patch = globalState.patch
    useEffect(() => {
        setIsLoading(true)
        setGameData({})
        setApiError({})
        leagueAPI.get(`/api/active-game/${encryptedSummonerId}`)
            .then(response => {
                const data = response.data
                const participantsByTeam = {}

                data.participants.forEach((participant) => {
                    const { teamId } = participant
                    if (!participantsByTeam[teamId]) {
                        participantsByTeam[teamId] = [];
                    }
                    participantsByTeam[teamId].push({
                        ...participant,
                        champion: patch[participant.championId]
                    })
                })

                const rolesOrder = ["TOP", "JUNGLE", "MIDDLE", "BOTTOM", "UTILITY"]
                let bestPermutations = []

                for(const teamId in participantsByTeam){
                    const team = participantsByTeam[teamId]

                    const permutations = getPermutations(team)
                    let bestPermutation = []
                    let bestResult = 0
                    permutations.forEach((permutation) => {
                        let i = 0                        
                        let currentResult = 0
                        permutation.forEach((participant) => {
                            currentResult += participant.champion.rolesPlayrate[rolesOrder[i]].playRate
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
                    teamsConfiguration: bestPermutations
                })
                setIsLoading(false)
            })
            .catch(error => {
                setApiError(error)
                setIsLoading(false)
            });
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