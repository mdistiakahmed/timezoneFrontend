import { useState } from 'react';
import { UserContext } from '../context/UserContext';
import { useToken } from '../hooks/useToken';
import './App.css';
import RoutesHandler from './Routes';

function App() {
  const { getToken } = useToken();
  // purpose of using context variable for token is, when we delete or add token
  // we want to refresh all the components so that, all component
  // start reading for token (from local storage)
  const [tokenContext, setTokenContext] = useState(getToken());
  return (
    <UserContext.Provider value={{ tokenContext, setTokenContext }}>
      <div className="App">
        <RoutesHandler />
      </div>
    </UserContext.Provider>
  );
}

export default App;
