import './App.css';
import RoutesHandler from './Routes';
import { useAppReducer } from '../hooks/useAppReducer';
import { ApplicationContext } from '../context/AppContext';
import ToastAlert from './pages/ToastAlert';
import { useApiHandler } from '../hooks/useApiHandler';

function App() {
    const { state, dispatch } = useAppReducer();
    const apiHandler = useApiHandler(dispatch);
    return (
        <ApplicationContext.Provider value={{ state, dispatch, apiHandler }}>
            <div className="App">
                <RoutesHandler />
                <ToastAlert />
            </div>
        </ApplicationContext.Provider>
    );
}

export default App;
