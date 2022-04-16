import { AlertColor } from '@mui/material';
import { useReducer } from 'react';

// An enum with all the types of actions to use in our reducer
export enum AppReducerActionKind {
    SET_ALERT,
    SET_TOKEN,
    REMOVE_TOKEN,
    SET_LOADER,
}

// An interface for our actions
export type AppReducerAction = {
    type: AppReducerActionKind;
    payload?: any;
};

// An interface for our state
export type AppState = {
    alert: AlertType;
    token: { value: string };
    isLoading: boolean;
};

type AlertType = {
    msg: string;
    type?: AlertColor;
};

const initialState: AppState = {
    alert: { msg: '' },
    token: { value: '' },
    isLoading: false,
};

const appReducerFunction = (state: AppState, action: AppReducerAction) => {
    const { type, payload } = action;
    switch (type) {
        case AppReducerActionKind.SET_ALERT:
            return {
                ...state,
                alert: payload ?? { msg: 'Unknown Error' },
            };
        case AppReducerActionKind.SET_TOKEN:
            localStorage.setItem('AUTH_TOKEN', payload ?? '');
            return {
                ...state,
                token: { value: payload ?? '' },
            };
        case AppReducerActionKind.REMOVE_TOKEN:
            localStorage.removeItem('AUTH_TOKEN');
            return {
                ...state,
                token: { value: '' },
            };
        case AppReducerActionKind.SET_LOADER:
            return {
                ...state,
                isLoading: payload,
            };
        default:
            console.error('No reducer found for action: ', action);
            return state;
    }
};

export const useAppReducer = () => {
    const [state, dispatch] = useReducer(appReducerFunction, initialState);

    return { state, dispatch };
};
