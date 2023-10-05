import { useReducer } from "react";

function getSavedValue(key, initialValue) {
    let storedValue = JSON.parse(localStorage.getItem(key))
    return (storedValue ? storedValue : initialValue)
}

export default function useLocalStorage(key, initialValue) {
    
    const [value, dispatch] = useReducer(usernamesReducer, getSavedValue(key, initialValue))

    function usernamesReducer(state, action) {
        let newState = state
        switch (action.type) {
            case "ADD": {
                if(!state.names.includes(action.userName)){
                    newState = {
                        ...state,
                        names: [...state.names, action.userName]
                    }
                }
                break;
            }

            case "DELETE":{
                if(state.names.includes(action.userName)){
                    const updatedUserNamesList = state.names.filter((element) => element !== action.userName)
                    newState =  {
                        ...state,
                        names : updatedUserNamesList
                    }
                }
                break;
            }
        }
        localStorage.setItem(key, JSON.stringify(newState))
        return newState
    }

    return [value, dispatch]
}