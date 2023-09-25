import { useEffect, useState } from "react";
import leagueAPI from '../api/leagueAPI';

export default function useUsernamesInformation(userName) {

    const [userData, setUserData] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [apiError, setApiError] = useState({})

    useEffect(() => {
        leagueAPI.get(`/api/user/information/${userName}`)
            .then(response => {                
                setUserData(response.data)
                setApiError({})
                setIsLoading(false)
            })
            .catch(error => {
                setUserData({})
                setApiError(error)
                setIsLoading(false)
            });
    }, []);

    return [userData, isLoading, apiError]
}