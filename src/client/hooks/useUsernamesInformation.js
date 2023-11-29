import { useEffect, useState, useContext } from "react";
import leagueAPI from '../api/leagueAPI';
import { GlobalStateContext } from '../App';
import { ACTIONS } from '../hooks/useGlobalState'

export default function useUsernamesInformation(puuid) {

    const [userData, setUserData] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [apiError, setApiError] = useState({})
    const { dispatchState } = useContext(GlobalStateContext);

    useEffect(() => {
        leagueAPI.get(`/api/user/information/${puuid}`)
            .then(response => {
                dispatchState([{ type: ACTIONS.UPDATE_USER, tag: response.data.accountData.tagLine, puuid: response.data.accountData.puuid }])    
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