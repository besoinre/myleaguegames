import Layout from './components/layout';
import { createContext } from 'react';
import { useEffect, useState } from "react";
import leagueAPI from './api/leagueAPI';

const defaultGlobalState = {
  refresh:false
}

const GlobalStateContext = createContext(null);

function App() {

  const [globalState, setGlobalState] = useState(defaultGlobalState)

  // TODO : replace with custome hook useRolesPlayrate
  useEffect(() => {
    leagueAPI.get(`/api/champions-position`)
      .then(response => {
        setGlobalState({ ...globalState, patch: response.data })
      })
      .catch(error => {
        console.log(error)
      })
  }, []);

  return (
    <GlobalStateContext.Provider value={{ globalState : globalState, setGlobalState: setGlobalState}}>
      <div>
        <Layout></Layout>
      </div>
    </GlobalStateContext.Provider>
  );
}

export { App, GlobalStateContext };
