import './App.css';
import RoutesHandler from './Routes';
import { useAppReducer } from '../hooks/useAppReducer';
import { ApplicationContext } from '../context/AppContext';
import ToastAlert from './pages/ToastAlert';

function App() {
    const { state, dispatch } = useAppReducer();
    return (
        <ApplicationContext.Provider value={{ state, dispatch }}>
            <div className="App">
                <RoutesHandler />
                <ToastAlert />
            </div>
        </ApplicationContext.Provider>
    );
}

export default App;
