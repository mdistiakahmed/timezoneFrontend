import './App.css';
import RoutesHandler from './Routes';
import { useAppReducer } from '../hooks/useAppReducer';
import { ApplicationContext } from '../context/AppContext';
import ToastAlert from './pages/ToastAlert';

// const AppContainer = mui.class

function App() {
    const { state, dispatch } = useAppReducer();

    // initialize the axios client
    // initialize reducer
    // create an api client
    // use that everywhere

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
