import { useEffect } from "react";
import leagueAPI from '../api/leagueAPI';

export default function usePatchData(globalState, dispatchGlobalState) {

    useEffect(() => {
        leagueAPI.get(`/api/champions-position`)
            .then(response => {
                dispatchGlobalState(globalState, { patch: response.data })
            })
            .catch(error => {
                console.log(error)
            })
        
    });
}