import { useReducer, useEffect } from "react";
import leagueAPI from '../api/leagueAPI';

function getInitialState(initialValue) {
    
    let storedValue = JSON.parse(localStorage.getItem("users"))
    return (storedValue ? { ...initialValue, names: storedValue } : { ...initialValue })
}

const ACTIONS = {
    ADD_USER: 'add_user',
    DELETE_USER: 'delete_user',
    DEFAULT_UPDATE: 'default_update'
}

function useGlobalState(initialValue) {

    let [initialState, dispatch] = useReducer(usernamesReducer, getInitialState(initialValue))

    useEffect(() => {
        leagueAPI.get(`/api/champions-position`)
            .then(response => {
                dispatch([{type: ACTIONS.DEFAULT_UPDATE, updateObject: {patch: response.data}}])
            })
            .catch(error => {
                console.log(error)
            })
        
    }, []);

    function usernamesReducer(state, actions) {
        let newUsersList;
        let newState = {...state};
        actions.forEach(action => {
            switch (action.type) {
                case ACTIONS.ADD_USER: {
                    if (!newState.names.includes(action.userName)) {
                        newUsersList = [action.userName, ...newState.names]
                        localStorage.setItem("users", JSON.stringify(newUsersList))
                        newState = {
                            ...newState,
                            names: newUsersList
                        }                     
                    }
                    break;
                }
                case ACTIONS.DELETE_USER: {
                    if (newState.names.includes(action.userName)) {
                        newUsersList = newState.names.filter((element) => element !== action.userName)
                        localStorage.setItem("users", JSON.stringify(newUsersList))
                        newState = {
                            ...newState,
                            names: newUsersList
                        }
                    }
                    break;
                }
                case ACTIONS.DEFAULT_UPDATE:
                    newState = {
                        ...newState,
                        ...action.updateObject
                    }
                    break;
                default:
                    break;
            }
        });
        
        return newState
    }
    return [initialState, dispatch]
}

export { useGlobalState, ACTIONS }