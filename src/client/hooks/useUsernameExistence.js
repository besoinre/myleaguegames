import { useEffect, useState } from "react";
import leagueAPI from '../api/leagueAPI';

export default function useUsernameExistence(userName) {

    const [userData, setUserData] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [apiError, setApiError] = useState({})

    useEffect(() => {
        setIsLoading(true)
        setUserData({})
        setApiError({})
        const delayDebounceFn = setTimeout(() => {
            if(userName.trim()!==""){
                leagueAPI.get(`/api/user/existence/${userName}`)
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
            }
        }, 1000)
        return () => clearTimeout(delayDebounceFn)
    }, [userName]);

    return [userData, isLoading, apiError]
}