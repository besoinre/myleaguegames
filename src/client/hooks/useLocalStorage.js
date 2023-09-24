import { useEffect, useState } from "react";

function getSavedValue(key, initialValue){
    let storedValue = JSON.parse(localStorage.getItem(key))
    
    if(storedValue) return storedValue
    
    return initialValue
}


export default function useLocalStorage(key, initialValue) {
    
    const [value, setValue] = useState(() => {    
        return getSavedValue(key, initialValue)
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [value])

    return [value, setValue]
}