import Layout from './components/layout';
import { createContext } from 'react';
import { useState } from "react";
import useRolesPlayrate from './hooks/useRolesPlayrate';

const defaultGlobalState = {
  refresh: false
}

const GlobalStateContext = createContext(null);
const GlobalThemeContext = createContext();

function App() {

  const [globalState, setGlobalState] = useState(defaultGlobalState)
  const [darkMode, setDarkMode] = useState('light');

  const toggleDarkMode = () => {
    (darkMode === 'light' ?
      setDarkMode('dark')
      : setDarkMode('light'))
  }

  useRolesPlayrate(globalState, setGlobalState)

  return (
    <GlobalThemeContext.Provider
      value={{ darkMode, toggleDarkMode }}>
      <GlobalStateContext.Provider value={{ globalState: globalState, setGlobalState: setGlobalState }}>
        <div className={'overflow-hidden theme-'+darkMode}>
          <Layout></Layout>
        </div>
      </GlobalStateContext.Provider>
    </GlobalThemeContext.Provider>
  );
}

export { App, GlobalStateContext, GlobalThemeContext };
