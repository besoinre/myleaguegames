import { useEffect, useState } from "react";
import leagueAPI from '../api/leagueAPI';

export default function useMatchHistory(encryptedSummonerId) {

    const [historyData, setHistoryData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [apiError, setApiError] = useState({})

    useEffect(() => {
        if (typeof encryptedSummonerId !== "undefined") {
            setIsLoading(true)
            setHistoryData([])
            setApiError({})

            leagueAPI.get(`/api/match-history/${encryptedSummonerId}`)
                .then(response => {
                    setHistoryData(response.data)
                    setIsLoading(false)
                })
                .catch(error => {
                    setApiError(error)
                    setIsLoading(false)
                });
        }
    }, [encryptedSummonerId]);

    return [historyData, isLoading, apiError]
}