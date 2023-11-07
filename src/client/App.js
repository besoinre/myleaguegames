import Layout from './pages/globals/layout';
import { createContext } from 'react';
import { useState } from "react";
import { useGlobalState } from './hooks/useGlobalState';

const defaultState = {
  names: [],
  refresh: false
}

const GlobalStateContext = createContext(undefined);
const GlobalThemeContext = createContext(undefined);

function App() {

  const [darkMode, setDarkMode] = useState('dark');
  const [state, dispatchState] = useGlobalState(defaultState);

  const toggleDarkMode = () => {
    (darkMode === 'light' ?
      setDarkMode('dark')
      : setDarkMode('light'))
  }

  return (
    <GlobalThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <GlobalStateContext.Provider value={{ state, dispatchState }}>
        <div className={'theme-' + darkMode}>
          <Layout />
        </div>
      </GlobalStateContext.Provider>
    </GlobalThemeContext.Provider>
  );
}

export { App, GlobalStateContext, GlobalThemeContext };
