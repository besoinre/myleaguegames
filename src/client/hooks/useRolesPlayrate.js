import { useEffect } from "react";
import leagueAPI from '../api/leagueAPI';

export default function useRolesPlayrate(globalState, setGlobalState) {

    useEffect(() => {
        leagueAPI.get(`/api/champions-position`)
            .then(response => {
                setGlobalState({ ...globalState, patch: response.data })
            })
            .catch(error => {
                console.log(error)
            })
        
    }, []);
}