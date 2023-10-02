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
                let updatedParticipants = data.participants.map((participant) => {
                    let currentParticipant;
                    Object.keys(patch).every((key) => {
                        if (parseInt(patch[key].key) === parseInt(participant.championId)) {
                            currentParticipant = {
                                ...participant,
                                champion: patch[key].name,
                                role: patch[key].role
                            }
                            return false
                        }
                        return true
                    })
                    return currentParticipant
                })

                const groupedByRole = updatedParticipants.reduce((result, participant) => {
                    const { role } = participant;
                    const existingGroup = result.find((group) => group[0]?.role === role);
                    if (existingGroup) {
                        existingGroup.push(participant);
                    } else {
                        result.push([participant]);
                    }
                    return result;
                }, []);

                const rolesOrder = ["top", "jungle", "mid", "bottom","support"]
                groupedByRole.sort((a, b) => rolesOrder.indexOf(a[0].role) - rolesOrder.indexOf(b[0].role))
                
                setGameData({
                    ...data,
                    participants: groupedByRole
                })
                setIsLoading(false)
            })
            .catch(error => {
                setApiError(error)
                setIsLoading(false)
            });
    }, [encryptedSummonerId]);

    return [gameData, isLoading, apiError]
}