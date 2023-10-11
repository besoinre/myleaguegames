import Layout from './components/layout';
import { createContext } from 'react';
import { useState } from "react";
import useRolesPlayrate from './hooks/useRolesPlayrate';

const defaultGlobalState = {
  refresh:false
}

const GlobalStateContext = createContext(null);

function App() {

  const [globalState, setGlobalState] = useState(defaultGlobalState)

  useRolesPlayrate(globalState, setGlobalState)
  
  return (
    <GlobalStateContext.Provider value={{ globalState : globalState, setGlobalState: setGlobalState}}>
      <div className='overflow-hidden'>
        <Layout></Layout>
      </div>
    </GlobalStateContext.Provider>
  );
}

export { App, GlobalStateContext };
