import { AlertColor } from '@mui/material';
import { useReducer } from 'react';

export enum AppReducerActionKind {
    SET_ALERT,
    SET_TOKEN,
    REMOVE_TOKEN,
    ALERT,
}

export type AppReducerAction = {
    type: AppReducerActionKind;
    payload?: any;
};

export type AppState = {
    alert: AlertType;
    token: { value: string };
};

type AlertType = {
    msg: string;
    type?: AlertColor;
};

const initialState: AppState = {
    alert: { msg: '' },
    token: { value: '' },
};

const appReducerFunction = (state: AppState, action: AppReducerAction) => {
    const { type, payload } = action;
    switch (type) {
        case AppReducerActionKind.ALERT:
            return {
                ...state,
                alert: payload ?? { msg: '' },
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
        default:
            console.error('No reducer found for action: ', action);
            return state;
    }
};

export const useAppReducer = () => {
    const [state, dispatch] = useReducer(appReducerFunction, initialState);

    return { state, dispatch };
};
