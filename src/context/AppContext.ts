import { createContext } from 'react';
import { AppReducerAction, AppState } from '../hooks/useAppReducer';

export const ApplicationContext = createContext<AppContextType>({state: {token:{value:''}, alert:{msg:''}}, dispatch: ()=>{}});

type AppContextType = {
    state: AppState;
    dispatch: (action:AppReducerAction) => void;
}