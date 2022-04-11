import { useReducer } from 'react';

// An enum with all the types of actions to use in our reducer
export enum AppReducerActionKind {
    SET_ALERT,
    SET_TOKEN,
    REMOVE_TOKEN,
    ERROR
}

// An interface for our actions
export type AppReducerAction = {
    type: AppReducerActionKind;
    payload?: string;
}

// An interface for our state
export type AppState = {
    alert: string;
    token: string;
}

const initialState: AppState = {
    alert: '',
    token: '',
};

const appReducerFunction = (state: AppState, action: AppReducerAction) => {
    const { type, payload } = action;
    switch (type) {
        case AppReducerActionKind.ERROR:
            console.log("Dispatched .... ");
            console.log("Action Payload: ", payload);
            return {
                ...state,
                alert: payload ?? 'Unknown Error'
            }
            case AppReducerActionKind.SET_TOKEN:
                console.log("Dispatched .... ");
                console.log("Action Payload: ", payload);
                return {
                    ...state,
                    token: payload ?? ''
                }
        default:
            console.error('No reducer found for action: ', action);
            return state;
    }
};

export const useAppReducer = () => {
    const [state, dispatch] = useReducer(appReducerFunction, initialState);

    return { state, dispatch };
};
