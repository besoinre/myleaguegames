import { useEffect, useState } from "react";
import leagueAPI from '../api/leagueAPI';

export default function useActiveGame(encryptedSummonerId) {

    const [gameData, setGameData] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [apiError, setApiError] = useState({})

    useEffect(() => {
        leagueAPI.get(`/api/active-game/${encryptedSummonerId}`)
            .then(response => {                
                setGameData(response.data)
                setApiError({})
                setIsLoading(false)
            })
            .catch(error => {
                setGameData({})
                setApiError(error)
                setIsLoading(false)
            });
    }, [encryptedSummonerId]);

    return [gameData, isLoading, apiError]
}