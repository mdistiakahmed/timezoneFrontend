import { useState } from 'react';
import { AuthContext } from '../context/AuthContext';
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
        <AuthContext.Provider value={{ tokenContext, setTokenContext }}>
            <div className="App">
                <RoutesHandler />
            </div>
        </AuthContext.Provider>
    );
}

export default App;
