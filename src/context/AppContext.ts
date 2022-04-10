import { createContext } from 'react';
import { AppReducerAction, AppState } from '../hooks/useAppReducer';

export const ApplicationContext = createContext<AppContextType>({state: {token:'', alert:''}, dispatch: ()=>{}});

type AppContextType = {
    state: AppState;
    dispatch: (action:AppReducerAction) => void;
}