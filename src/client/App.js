import Layout from './components/layout';

const globalState = {
  selectedUser: "",
};

const globalStateContext = React.createContext(globalState);

function App() {
  return (
    <globalStateContext.Provider value={globalState}>
      <div>
        <Layout></Layout>
      </div>
    </globalStateContext.Provider>
  );
}

export default App;
