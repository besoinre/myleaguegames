import { useEffect, useState, useRef } from "react";
import leagueAPI from '../api/leagueAPI';

export default function useMatchHistory(encryptedSummonerId) {

    const [historyData, setHistoryData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [apiError, setApiError] = useState({})
    const isInitialRender = useRef(true);

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
                    setHistoryData(response.data)
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